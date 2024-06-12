import TaskStatusBadge from "@/app/components/TaskStatusBadge";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Table, Dialog, Button, Flex, IconButton } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import DeleteTaskButton from "../[id]/DeleteTaskButton";
import EditTaskButton from "../[id]/EditTaskButton";
import TaskDetails from "../[id]/TaskDetails";
import Skeleton from "@/app/components/Skeleton";

const LoadingTasksPage = () => {
  const tasks = [1, 2, 3, 4, 5];
  return (
    <div className="pr-5">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <Link href="/tasks?sortOrder=name">Task</Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              <Link href="/tasks?sortOrder=status">Status</Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              <Link href="/tasks?sortOrder=dueDateTime">Due Date/Time</Link>
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task}>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingTasksPage;
