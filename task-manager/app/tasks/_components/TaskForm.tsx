"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import { taskSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PiWarningCircle } from "react-icons/pi";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type taskFormData = z.infer<typeof taskSchema>;

const TaskForm = ({ task }: { task?: Task }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<taskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const dueDateTime = new Date(data.dueDateTime).toISOString(); //2024-01-01T12:00:00.000Z
    // dueDateTime converted to isoString prior to patch/post
    const formattedData = {
      title: data.title,
      dueDateTime,
      description: data.description,
    };
    try {
      setIsSubmitting(true);
      // check to see if a task is passed in to determine new vs. edit
      if (task) await axios.patch("/api/tasks/" + task.id, formattedData);
      //output format dueDateTime from input field: 2024-06-19T09:00
      else await axios.post("/api/tasks", formattedData);
      router.push("/tasks");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error has occurred.");
    }
  });
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
      <form className="space-y-3 border-1 items-center" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={task?.title}
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <TextField.Root
          defaultValue={task?.dueDateTime?.toISOString().slice(0, 16)}
          type="datetime-local"
          {...register("dueDateTime")}
        ></TextField.Root>
        <ErrorMessage>{errors.dueDateTime?.message}</ErrorMessage>

        <Controller
          name="description"
          defaultValue={task?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {task ? "Update Task Details" : "Create New Task"}
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
