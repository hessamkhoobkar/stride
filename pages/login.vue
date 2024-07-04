<template>
  <NuxtLayout name="auth">
    <div
      class="mx-auto flex h-full w-full max-w-md flex-col items-start justify-center"
    >
      <AuthHead />
      <AuthOAuths @handle-signin="signInWithOAuth" />
      <Separator label="OR" class="my-8" />
      <AuthDemoAccounts @handle-signin="signInWithPassword" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
/**
 * Page meta configuration.
 */
definePageMeta({
  layout: false,
});

// Importing necessary composables from Supabase client
const user = useSupabaseUser();
const { auth } = useSupabaseClient();

// Redirect address for OAuth sign in
const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`;

/**
 * Sign in a user with email and password. Not really. This is the method used under the hood for the demo accounts sign in button.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<void>} - A promise that resolves when the sign-in process is complete.
 */
const signInWithPassword = async (
  email: string,
  password: string,
): Promise<void> => {
  const { error } = await auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log(error);
  }
};

type Provider = "google" | "github" | "gitlab";

/**
 * Sign in a user with an OAuth provider.
 *
 * @param {Provider} provider - The OAuth provider name.
 * @returns {Promise<void>} - A promise that resolves when the sign-in process is complete.
 */
const signInWithOAuth = async (provider: Provider): Promise<void> => {
  const { error } = await auth.signInWithOAuth({
    provider: provider,
    options: { redirectTo },
  });

  if (error) {
    console.log(error);
  }
};

/**
 * Watch the user state and navigate to the home page if the user is authenticated.
 */
watchEffect(() => {
  if (user.value) {
    navigateTo("/");
  }
});
</script>
