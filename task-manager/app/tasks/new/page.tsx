"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiWarningCircle } from "react-icons/pi";

interface TaskForm {
  title: string;
  dueDateTime: string;
  description: string;
}

const NewTaskPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<TaskForm>();

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

        <TextField.Root
          type="datetime-local"
          {...register("dueDateTime")}
        ></TextField.Root>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button>Create New Task</Button>
      </form>
    </div>
  );
};

export default NewTaskPage;
