<template>
  <NuxtLayout name="auth">
    <p>Waiting for login provider...</p>
  </NuxtLayout>
</template>

<script setup lang="ts">
/**
 * Page meta configuration.
 */
definePageMeta({
  layout: false,
});

// Importing necessary composables from Supabase User
const user = useSupabaseUser();

/**
 * Redirect to protected page if user is logged in
 *
 * @returns {void}
 */
watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/");
    }
  },
  { immediate: true },
);
</script>
