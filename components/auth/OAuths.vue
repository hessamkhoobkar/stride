<script lang="ts" setup>
import GoogleIcon from "~/assets/icons/GoogleIcon.vue";
import GithubIcon from "~/assets/icons/GithubIcon.vue";
import GitlabIcon from "~/assets/icons/GitlabIcon.vue";

const oAuths = [
  {
    name: "Google",
    icon: GoogleIcon,
  },
  {
    name: "Github",
    icon: GithubIcon,
  },
  {
    name: "Gitlab",
    icon: GitlabIcon,
  },
];
</script>

<template>
  <section class="w-full">
    <!-- Section title -->
    <p class="mb-4 text-slate-500">
      You can sing in with one of these OAuth providers:
    </p>

    <div class="flex w-full flex-col items-center justify-center gap-2">
      <Button
        v-for="auth in oAuths"
        :key="auth.name"
        class="w-full gap-2"
        variant="outline"
        size="lg"
        @click="$emit('handleSignin', auth.name.toLowerCase())"
      >
        <component :is="auth.icon" class="h-6 w-6" />
        <span> Sign In with {{ auth.name }} </span>
      </Button>
    </div>
  </section>
</template>
