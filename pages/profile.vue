<template>
  <Card>
    <CardHeader>
      <CardTitle>Profile</CardTitle>
      <CardDescription>
        These are read-only details for your account. This is to pervent edits
        on demo accounts.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="full_name" class="text-sm font-medium">Full Name</label>
          <Input
            id="full_name"
            v-model="profile.full_name"
            type="text"
            placeholder="Full Name"
            class="w-full"
            readonly
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="email" class="text-sm font-medium">Email</label>
          <Input
            id="email"
            v-model="profile.email"
            type="email"
            placeholder="Email"
            class="w-full"
            readonly
          />
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" disabled>
        <span>Submit</span>
      </Button>
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup>
// Get the user object
const user = useSupabaseUser();

// Initialize the store
const store = useUserStore();

// User data is reactive and will update when the store updates
const profile = ref<UserProfile>({
  avatar: "",
  full_name: "",
  email: "",
});

// If the user is logged in, set the profile data
if (store.user) {
  profile.value = {
    avatar: store.user.avatar,
    full_name: store.user.full_name,
    email: store.user.email,
  };
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
