<script lang="ts" setup>
const user = useSupabaseUser();
const { auth } = useSupabaseClient();

const signOut = async () => {
  let { error } = await auth.signOut();
  if (error) console.log(error);
};

watchEffect(() => {
  if (!user.value) {
    navigateTo("/login");
  }
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea voluptatum
      dicta sunt modi cumque, voluptate, numquam saepe officia unde ex aliquid
      quas porro veniam nihil fugiat architecto laborum. Atque, repellendus?
    </p>
    <Button @click="signOut">Sign Out</Button>
  </div>
  <!-- <pre>
    {{ user }}
  </pre> -->
</template>

<style scoped>
/*  */
</style>
