<template>
  <Card>
    <CardContent class="p-4">
      <div class="flex">
        <h3
          class="text-xl transition-all duration-300 ease-in-out"
          :class="task.is_completed ? 'text-green-500 line-through' : ''"
        >
          {{ task.title }}
        </h3>
        <div class="ms-auto flex items-center justify-end gap-2">
          <Button
            class="ml-auto"
            :class="
              task.is_completed
                ? 'border-green-600 bg-green-600 text-white'
                : ''
            "
            variant="outline"
            size="icon"
            @click="setComplete"
          >
            <CheckIcon class="h-4 w-4" />
          </Button>

          <Button
            class="ml-auto"
            variant="outline"
            size="icon"
            @click="deleteTask"
          >
            <TrashIcon class="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div class="flex">
        <p class="text-sm text-slate-500" v-if="task.description">
          {{ task.description }}
        </p>
        <p class="text-sm text-slate-500" v-else>No description</p>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import type { Database } from "~/types/supabase";

import { useToast } from "./ui/toast/use-toast";

import TrashIcon from "~/assets/icons/TrashIcon.vue";
import CheckIcon from "~/assets/icons/CheckIcon.vue";

const client = useSupabaseClient<Database>();

/** Define the type for the task prop */
const props = defineProps<{
  task: Database["public"]["Tables"]["tasks"]["Row"];
}>();

const { toast } = useToast();

// We do not need to recive the data returend from deleteTask() and setComplete()
// as the data is recived from websockets and optimistic updates are not necessary

/** Delete the task from the database
 * @async
 * @returns {Promise<void>}
 */
const deleteTask = async (): Promise<void> => {
  const { data, error } = await client
    .from("tasks")
    .delete()
    .eq("id", props.task.id);

  if (error) {
    toast({
      title: "Error",
      description: "Something went wrong",
      variant: "destructive",
    });
  }

  if (!error) {
    toast({
      title: "Task Deleted",
    });
  }
};

/** Toggle the task's completion status
 * @async
 * @returns {Promise<void>}
 */
const setComplete = async (): Promise<void> => {
  const { data, error } = await client
    .from("tasks")
    .update({ is_completed: !props.task.is_completed })
    .eq("id", props.task.id)
    .select();

  if (error) {
    toast({
      title: "Error",
      description: "Something went wrong",
      variant: "destructive",
    });
  }

  if (data && !error) {
    toast({
      title: data[0].is_completed ? "Task completed" : "Task Opened",
      description: data[0].is_completed
        ? `You have completed ${data[0].title}`
        : `You have opened ${data[0].title}`,
    });
  }
};
</script>
