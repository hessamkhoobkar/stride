<template>
  <!-- Section title -->
  <p class="mb-4 text-slate-500">
    You can also sign in with one of these demo accounts:
  </p>

  <!-- 
    As this design is for listing the demo accounts, 
    there is no need to abstract the card to a separate component, 
    as it should not be used in any other place other than here
  -->
  <div class="flex w-full flex-col items-center justify-center gap-2">
    <Card class="w-full" v-for="account in demoAccounts" :key="account.id">
      <CardContent class="flex flex-row items-center justify-start gap-4 p-3">
        <Avatar size="base" shape="square">
          <AvatarImage :src="account.avatar" :alt="account.name" />
          <AvatarFallback>{{ account.initials }}</AvatarFallback>
        </Avatar>
        <div class="flex flex-col items-start">
          <span> {{ account.name }} </span>
          <span class="text-sm text-muted-foreground">
            {{ account.email }}
          </span>
        </div>

        <Button
          class="ms-auto"
          @click="$emit('handleSignin', account.email, account.password)"
        >
          Sign in
        </Button>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
// DO NOT USE THIS IN PRODUCTION
//
// This is obscene for production,
// this is against any security best practices,
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
