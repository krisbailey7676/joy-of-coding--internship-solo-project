import { sort } from "fast-sort";
import TaskStatusBadge from "@/app/components/TaskStatusBadge";
import prisma from "@/prisma/client";
import {
  Box,
  Button,
  Flex,
  Inset,
  Popover,
  Table,
  TextArea,
} from "@radix-ui/themes";
import Link from "../components/Link";
import React, { cache } from "react";
import { CrossCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import TaskDetails from "./[id]/TaskDetails";
import EditTaskButton from "./[id]/EditTaskButton";
import { Task } from "@prisma/client";
import { number, string } from "zod";

// interface Task {
//   id: number;
//   title: string;
//   dueDateTime: string;
// }

interface Props {
  sortOrder: string;
}

const taskTable = async ({ sortOrder }: Props) => {
  const tasks = await prisma.task.findMany();

  //task sorting default is by title
  const sortedTasks = sort(tasks).asc(
    sortOrder === "dueDateTime"
      ? (task) => task.dueDateTime
      : sortOrder === "status"
        ? (task) => task.status
        : (task) => task.title
  );

  return (
    <div className="pr-5">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              <Link href="/tasks?sortOrder=name">Task</Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              <Link href="/tasks?sortOrder=status">Status</Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              <Link href="/tasks?sortOrder=dueDateTime">Due Date/Time</Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedTasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>
                <Link href={`/tasks/${task.id}`}>{task.title}</Link>

                {/* <Popover.Root>
                  <Popover.Trigger>
                    <Button>{task.title}</Button>
                  </Popover.Trigger>
                  <Popover.Content width="500px" height="20rem">
                    <Popover.Close>
                      <Flex justify={"end"}>
                        <Button color="red">
                          <CrossCircledIcon />
                        </Button>
                      </Flex>
                    </Popover.Close>
                    <Flex flexGrow="1" direction="column" gap="4">
                      <TaskDetails task={task} />
                      <EditTaskButton taskId={task.id} />
                    </Flex>
                  </Popover.Content>
                </Popover.Root> */}

                <div className="block md:hidden">
                  <TaskStatusBadge status={task.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <TaskStatusBadge status={task.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {task.dueDateTime?.toLocaleString()}
              </Table.Cell>
              <Table.Cell>
                <Link href={`/tasks/${task.id}`}>Delete</Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default taskTable;
