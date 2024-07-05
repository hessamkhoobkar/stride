<template>
  <div class="min-h-screen w-full bg-slate-200 p-4">
    <div class="mx-auto flex h-full w-full max-w-screen-lg flex-col gap-4">
      <Header />
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Database } from "~/types/supabase";

// initialize the supabase client and Get the user object
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();

// Initialize the store
const store = useUserStore();

// Why are we setting the user here rather than in the middleware?
// Middleware is an overkill for this purpose, but it's a good practice to
// set the user in the middleware if you have a protected route.
// As supabaseClient is already initialized in the middleware,
// and using the middleware for rerouting the protected routes, we do not need
// Reintroducing a new middleware for storage separately and setting the user to store it in the root layout of protected routes is enough,
// as the middleware is already initialized and users are already available.

/**
 * Get the user profile on page load
 * @returns {Promise<void>}
 */
let { data: profile, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", user.value!.id)
  .single();

if (error) {
  throw error;
}

// If the user is logged in, set the profile data in the store
if (profile && user.value && user.value.email) {
  store.setUser({
    full_name: profile.full_name,
    avatar: profile.avatar_url,
    email: user.value.email,
  });
}

// The middleware will redirect the user to the login page if the user is not logged in
// in case some edge case or failure, we have a redirect fallback here too

/**
 * Sign out the user
 * @returns {Promise<void>}
 */
watchEffect(() => {
  if (!user.value) {
    navigateTo("/login");
  }
});
</script>
