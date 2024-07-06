<template>
  <div class="flex items-center justify-start">
    <div class="flex items-baseline justify-start gap-2">
      <h2 class="text-2xl font-bold">Open tasks</h2>
      <p class="text-sm text-slate-500">Sorted by last update</p>
    </div>
    <div class="ms-auto flex gap-2">
      <div class="flex flex-row-reverse" v-auto-animate>
        <ActiveUser
          class="-ms-4"
          v-for="user in activeUsers"
          :key="user"
          :userId="user"
        />
      </div>
      <TaskModal />
    </div>
  </div>

  <div class="flex flex-col gap-2" v-auto-animate>
    <TaskCard v-for="task in openTasks" :key="task.id" :task="task" />
  </div>

  <div class="mt-4 flex items-baseline justify-start gap-2">
    <h2 class="text-2xl font-bold">Completed tasks</h2>
  </div>
  <div class="flex flex-col gap-2" v-auto-animate>
    <TaskCard v-for="task in completedTasks" :key="task.id" :task="task" />
  </div>

  <Toaster />
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
// @ts-ignore - supabase-js doesn't have types for RealtimeChannel
import type { RealtimeChannel } from "@supabase/supabase-js";
import type { Database } from "~/types/supabase";

const activeUsers = ref<string[]>([]);

const client = useSupabaseClient<Database>();

let realtimeChannel: RealtimeChannel;

/**
 * Fetch tasks data and get the refresh method.
 *
 * @type {Object}
 * @property {Ref<any>} data - The tasks data.
 * @property {Function} refresh - The method to refresh tasks.
 */
const { data: tasks, refresh: refreshTasks } = await useAsyncData(
  "tasks",
  async () => {
    const { data } = await client
      .from("tasks")
      .select("*")
      .order("updated_at", { ascending: false });
    return data;
  },
);

/**
 * Computes the list of open tasks.
 *
 * @returns {Array<any>} The list of open tasks.
 */
const openTasks = computed(() => {
  return (
    tasks.value && tasks.value.filter((task) => task.is_completed === false)
  );
});

/**
 * Computes the list of completed tasks.
 *
 * @returns {Array<any>} The list of completed tasks.
 */
const completedTasks = computed(() => {
  return (
    tasks.value && tasks.value.filter((task) => task.is_completed === true)
  );
});

const roomOne = client.channel("tasks_room");

/**
 * Setup real-time listeners and presence tracking on component mount.
 */
onMounted(() => {
  realtimeChannel = client
    .channel("public:tasks")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "tasks" },
      () => refreshTasks(),
    );

  realtimeChannel.subscribe();

  const userStatus = {
    user: user.value?.id,
    online_at: new Date().toISOString(),
  };

  roomOne
    .on("presence", { event: "sync" }, () => {
      const newState = roomOne.presenceState();
      console.log("sync", newState);
    })
    .on("presence", { event: "join" }, ({ key, newPresences }) => {
      console.log("join", key, newPresences);

      if (newPresences[0].user !== user.value?.id) {
        activeUsers.value = [...activeUsers.value, newPresences[0].user];
      }
    })
    .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
      console.log("leave", key, leftPresences);

      activeUsers.value = activeUsers.value.filter(
        (user) => user !== leftPresences[0].user,
      );
    })
    .subscribe();

  const presenceTrackStatus = roomOne.track(userStatus);
  console.log(presenceTrackStatus);
});

/**
 * Untrack the presence of the user.
 *
 * @async
 * @function untrackPresence
 * @returns {Promise<void>}
 */
const untrackPresence = async () => {
  const presenceUntrackStatus = await roomOne.untrack();
  console.log(presenceUntrackStatus);
};

// Unsubscribe from channels and untrack presence when the component is unmounted
onUnmounted(() => {
  client.removeChannel(realtimeChannel);

  untrackPresence();
});

// Redirect to login if the user is not authenticated
watchEffect(() => {
  if (!user.value) {
    navigateTo("/login");
  }
});
</script>
