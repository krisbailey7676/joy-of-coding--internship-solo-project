"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiWarningCircle } from "react-icons/pi";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/app/validationSchemas";
import { z } from "zod";

type TaskForm = z.infer<typeof createTaskSchema>;

const NewTaskPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: zodResolver(createTaskSchema),
  });

  const onSubmit = async (data: TaskForm) => {
    try {
      //output format dueDateTime from input field: 2024-06-19T09:00
      const dueDateTime = new Date(data.dueDateTime).toISOString(); //2024-01-01T12:00:00.000Z
      const task = {
        title: data.title,
        dueDateTime,
        description: data.description,
      };
      await axios.post("/api/tasks", task);
      router.push("/tasks");
    } catch (error) {
      setError("An unexpected error has occurred.");
    }
  };
  return (
    <div className="max-w-xl px-5">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <PiWarningCircle color="red" />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3 border-1 items-center"
        // onSubmit={handleSubmit((data) => console.log(data))}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}

        <TextField.Root
          type="datetime-local"
          {...register("dueDateTime")}
        ></TextField.Root>
        {errors.dueDateTime && (
          <Text color="red" as="p">
            {errors.dueDateTime.message}
          </Text>
        )}

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}

        <Button>Create New Task</Button>
      </form>
    </div>
  );
};

export default NewTaskPage;
