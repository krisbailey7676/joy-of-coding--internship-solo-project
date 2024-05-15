"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewTaskPage = () => {
  return (
    <div className="max-w-xl px-5 space-y-3 items-center">
      <TextField.Root placeholder="Title"></TextField.Root>
      <TextArea placeholder="Description"></TextArea>
      <Button>Create New Task</Button>
    </div>
  );
};

export default NewTaskPage;
