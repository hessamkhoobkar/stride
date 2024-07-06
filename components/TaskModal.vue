<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="default"> Add task </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add new task</DialogTitle>
        <DialogDescription> What should we do today? </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <Label class="mb-2" for="title"> Title </Label>
            <Input
              id="title"
              name="title"
              v-model="title"
              v-bind="titleAttrs"
            />
            <span class="text-xs text-destructive">{{ errors.title }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <Label class="mb-2" for="description"> Description </Label>
            <Textarea
              id="description"
              name="description"
              v-model="description"
              v-bind="descriptionAttrs"
            />
            <span class="text-xs text-destructive">{{
              errors.description
            }}</span>
          </div>
        </div>
        <div class="flex items-center justify-end pt-4">
          <Button type="submit"> Submit task </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import type { Database } from "~/types/supabase";

import { useForm } from "vee-validate";
import * as yup from "yup";

import { useToast } from "./ui/toast/use-toast";

const client = useSupabaseClient<Database>();

/** Toast notifications */
const { toast } = useToast();

/** Open state for the modal */
const open = ref(false);

/** Form validation schema */
const { defineField, errors, handleSubmit } = useForm({
  validationSchema: yup.object({
    title: yup
      .string()
      .required()
      .min(3, "title should be at least 3 characters")
      .max(45, "title is too long"),
    description: yup.string().max(120, "description is too long"),
  }),
});

/** Form fields */
const [title, titleAttrs] = defineField("title");
const [description, descriptionAttrs] = defineField("description");

// Here as well as any update on the tasks, we do not neeed to recive the data
// as the data is recived from websockets and optimistic updates are not necessary

/**
 * Handles form submission to insert a new task into the database.
 *
 * @async
 * @function onSubmit
 * @param {Object} values - The form values.
 * @param {Object} formActions - Actions to manipulate the form state.
 * @returns {Promise<void>}
 */
const onSubmit = handleSubmit(async (values, { resetForm }): Promise<void> => {
  const { data, error } = await client
    .from("tasks")
    .insert([
      {
        title: values.title,
        description: values.description,
        is_completed: false,
      },
    ])
    .select();

  console.log(data);

  resetForm();
  open.value = false;

  if (error) {
    toast({
      title: "Error",
      description: "Something went wrong",
      variant: "destructive",
    });
  }

  if (data && !error) {
    toast({
      title: "You have added a new task",
    });
  }
});
</script>
