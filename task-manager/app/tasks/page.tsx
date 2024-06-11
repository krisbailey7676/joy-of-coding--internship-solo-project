import React from "react";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import TaskTable from "./TaskTable";

interface Props {
  searchParams: { sortOrder: string };
}

const TasksPage = ({ searchParams: { sortOrder } }: Props) => {
  return (
    <div className="p-3 space-y-5">
      <Flex gap={"4"}>
        <Button>
          <Link href="/tasks/new">New Task</Link>
        </Button>
      </Flex>
      <TaskTable sortOrder={sortOrder} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default TasksPage;
