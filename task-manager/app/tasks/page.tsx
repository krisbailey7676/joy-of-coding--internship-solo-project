import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const TasksPage = () => {
  return (
    <div className="flex flex-col p-3 max-w-80 space-y-5">
      <Button>
        <Link href="/tasks/new">New Task</Link>
      </Button>
      <Button>
        <Link href="/tasks/taskList">View Task List</Link>
      </Button>
      <Button>
        <Link href="/tasks/delete">Delete Task</Link>
      </Button>
      <Button>
        <Link href="/tasks/edit">Edit Task</Link>
      </Button>
    </div>
  );
};

export default TasksPage;
