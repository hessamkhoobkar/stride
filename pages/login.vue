<script setup lang="ts">
const user = useSupabaseUser();
const { auth } = useSupabaseClient();

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`;

// const email = ref("");

const signInWithPassword = async () => {
  const { data, error } = await auth.signInWithPassword({
    email: "DianaBridges@dayrep.com",
    password: "wo4eGh6xai",
  });

  if (error) console.log(error);
  if (data) console.log(data);
};

const signInWithOAuth = async () => {
  const { error } = await auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: redirectTo,
    },
  });
  if (error) console.log(error);
};

watchEffect(() => {
  if (user.value) {
    navigateTo("/");
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen gap-2">
    <Button @click="signInWithPassword">
      Sign In with E-Mail and password
    </Button>
    <Button @click="signInWithOAuth">Sign In with Github</Button>
  </div>
</template>
