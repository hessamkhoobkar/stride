<template>
  <Avatar
    v-if="profile !== null"
    shape="square"
    class="border-2 border-slate-100 transition-transform hover:scale-110"
  >
    <AvatarImage
      v-if="profile.avatar_url !== null"
      :src="profile.avatar_url"
      :alt="profile.full_name"
    />
    <AvatarFallback>
      {{
        profile && profile.full_name
          ? profile.full_name.charAt(0).toUpperCase()
          : "NA"
      }}
    </AvatarFallback>
  </Avatar>
</template>

<script lang="ts" setup>
import type { Database } from "~/types/supabase";

/** Props definition
 * @type {{ userId: string }}
 */
const props = defineProps<{
  userId: string;
}>();

const client = useSupabaseClient<Database>();

/** Profile state
 * @type {Ref<{ avatar_url: string | null; full_name: string | null } | null>}
 */
const profile = ref<{
  avatar_url: string | null;
  full_name: string | null;
} | null>(null);

/** Error state
 * @type {Ref<Error | null>}
 */
const error = ref<Error | null>(null);

/** Fetches the user's profile from the database
 * @async
 * @function fetchProfile
 * @returns {Promise<void>}
 */
const fetchProfile = async (): Promise<void> => {
  try {
    const { data, error: fetchError } = await client
      .from("profiles")
      .select("avatar_url, full_name")
      .eq("id", props.userId)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    profile.value = data;
  } catch (err) {
    error.value = err as Error;
    console.error(err);
  }
};

onMounted(fetchProfile);
</script>
