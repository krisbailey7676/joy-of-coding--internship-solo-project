"use client";

import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewTaskPage = () => {
  return (
    <div className="max-w-xl px-5 space-y-3 items-center">
      <TextField.Root placeholder="Title"></TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Create New Task</Button>
    </div>
  );
};

export default NewTaskPage;
