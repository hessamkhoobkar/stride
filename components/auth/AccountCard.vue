<template>
  <Card class="w-full">
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

      <Button class="ms-auto" @click="handleButtonClick" :disabled="loading">
        <span v-if="loading" class="flex items-center gap-2">
          <LoadingIcon class="h-4 w-4 animate-spin" />
          <span> Processing </span>
        </span>
        <span v-else> Sign in </span>
      </Button>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import LoadingIcon from "~/assets/icons/LoadingIcon.vue";

/**
 * Account information interface.
 * TODO: This should be abstracted to a separate file.
 */
interface Account {
  avatar: string;
  name: string;
  initials: string;
  email: string;
  password: string;
}

// Define props with type safety
const props = defineProps<{ account: Account }>();

// Define loading state
const loading = ref<boolean>(false);

// Emit event setup
const emit = defineEmits<{
  (e: "handleButtonClick"): void;
}>();

/**
 * Handle button click event.
 * Emits 'handleButtonClick' event to parent and sets loading state.
 * @returns {void}
 */
const handleButtonClick = () => {
  loading.value = true;
  emit("handleButtonClick");
};
</script>
