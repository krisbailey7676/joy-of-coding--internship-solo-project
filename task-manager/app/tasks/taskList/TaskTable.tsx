// import { sort } from "fast-sort";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import React, { cache } from "react";

interface Task {
  id: number;
  title: string;
  // description: string;
  dueDateTime: string;
}

// interface Props {
//   sortOrder: string;
// }

const taskTable = async () => {
  const tasks = await prisma.task.findMany();

  //   const sortedUsers = sort(users).asc(
  //     sortOrder === "email" ? (user) => user.email : (user) => user.name
  //   );
  return (
    <div className="p-5">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Task</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Due
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>
                {task.title}
                <div className="block md:hidden">{task.status}</div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {task.status}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {task.dueDateTime?.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default taskTable;
