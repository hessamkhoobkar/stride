<template>
  <!-- Section title -->
  <p class="mb-4 text-slate-500">
    You can also sign in with one of these demo accounts:
  </p>

  <!-- Account Card component is abstracted to a adjacent file as it should not be used in any other place other than here -->
  <div class="flex w-full flex-col items-center justify-center gap-2">
    <AccountCard
      v-for="account in demoAccounts"
      :key="account.id"
      :account="account"
      @handle-button-click="
        $emit('handleSignin', account.email, account.password)
      "
    />
  </div>
</template>

<script lang="ts" setup>
import AccountCard from "./AccountCard.vue";

// DO NOT USE THIS IN PRODUCTION
//
// This is obscene in any shape and form for production,
// this is even against most fundamentals of security,
// but it's just for the demo to give vistors a sense of what it's like to use Stride.
//
// DO NOT USE THIS IN PRODUCTION
const demoAccounts = [
  {
    id: 1,
    name: "Roy J. Maes",
    initials: "RM",
    email: "royjmaes@teleworm.us",
    password: "phaifie4UC",
    avatar: "/users/avatar-01.jpg",
  },
  {
    id: 2,
    name: "Diana Bridges",
    initials: "DB",
    email: "dianabridges@dayrep.com",
    password: "wo4eGh6xai",
    avatar: "/users/avatar-02.jpg",
  },
  {
    id: 3,
    name: "Marci Clark",
    initials: "MC",
    email: "marciclark@jourrapide.com",
    password: "coo4Ahyaed",
    avatar: "/users/avatar-03.jpg",
  },
];
</script>
