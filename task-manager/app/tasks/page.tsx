import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const TasksPage = () => {
  return (
    <Button>
      <Link href="/tasks/new">New Task</Link>
    </Button>
  );
};

export default TasksPage;
