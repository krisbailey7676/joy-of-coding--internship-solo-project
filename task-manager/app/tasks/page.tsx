import React from "react";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import TaskTable from "./TaskTable";

const TasksPage = () => {
  return (
    <div className="p-3 space-y-5">
      <Flex gap={"4"}>
        <Button>
          <Link href="/tasks/new">New Task</Link>
        </Button>
        <Button>
          <Link href="/tasks/delete">Delete Task</Link>
        </Button>
      </Flex>
      <TaskTable />
    </div>
  );
};

export default TasksPage;
