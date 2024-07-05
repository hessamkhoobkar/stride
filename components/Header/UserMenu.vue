<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">
        <Avatar shape="square">
          <AvatarImage
            :src="profile.avatar || '#'"
            :alt="profile.full_name || 'User avatar'"
          />
          <AvatarFallback>
            <span class="font-bold">
              {{
                profile.full_name
                  ? profile.full_name.charAt(0).toUpperCase()
                  : "NA"
              }}
            </span>
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-56">
      <DropdownMenuLabel class="flex flex-col">
        <span>{{ profile.full_name }}</span>
        <span class="text-xs text-slate-500">{{ profile.email }}</span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem as-child>
          <NuxtLink to="/profile" class="flex items-center">
            <UserIcon class="me-2 h-4 w-4" />
            <span> Profile </span>
          </NuxtLink>
        </DropdownMenuItem>
        <DropdownMenuItem @click="signOut">
          <LogoutIcon class="me-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/stores/user";

import UserIcon from "~/assets/icons/UserIcon.vue";
import LogoutIcon from "~/assets/icons/LogoutIcon.vue";

// Get the auth object from the client
const { auth } = useSupabaseClient();

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

/**
 * Sign out the user
 * @returns {Promise<void>}
 */
const signOut = async () => {
  let { error } = await auth.signOut();
  if (error) console.log(error);
};
</script>

<style>
[role="menuitem"] {
  cursor: pointer;
}
</style>
