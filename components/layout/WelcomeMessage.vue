<template>
  <div class="w-full max-w-screen-sm px-4 pt-8 md:px-12">
    <h2 class="mb-4 text-8xl font-black leading-[5rem] tracking-tighter">
      Focus on the work that matters.
    </h2>

    <p class="mb-4">
      Experience a new level of efficiency and collaboration. Stride is designed
      to help you manage your tasks seamlessly, whether you're working solo or
      as part of a team.
    </p>
  </div>
  <div class="hidden w-full px-4 pt-8 md:block md:px-12">
    <p class="mb-4">With Stride, you can:</p>

    <ul class="flex w-full flex-col gap-4">
      <li class="flex items-center gap-2">
        <CheckCircleIcon class="h-5 w-5 text-foreground" />
        <span class="font-bold">Track Your Tasks:</span>
        <span>Easily create, edit, and prioritize your tasks</span>
      </li>
      <li class="flex items-center gap-2">
        <CheckCircleIcon class="h-5 w-5 text-foreground" />
        <span class="font-bold">Collaborate in Real-Time:</span>
        <span>Share tasks and updates with your team instantly</span>
      </li>
      <li class="flex items-center gap-2">
        <CheckCircleIcon class="h-5 w-5 text-foreground" />
        <span class="font-bold">Stay Updated:</span>
        <span>Stay updated with task and updates</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import CheckCircleIcon from "~/assets/icons/CheckCircle.vue";
</script>
