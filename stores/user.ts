import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref<UserProfile | null>(null);

  function setUser(resUser: UserProfile) {
    user.value = resUser;
  }
  return { user, setUser };
});
