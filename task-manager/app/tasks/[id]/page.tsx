import TaskStatusBadge from "@/app/components/TaskStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string }; // route parameters
}

const TaskDetailPage = async ({ params }: Props) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!task) notFound();

  return (
    <div>
      <Flex gap={"3"} my={"2"} align={"center"}>
        <Heading>{task.title}</Heading>
        <TaskStatusBadge status={task.status} />
      </Flex>
      <Text>{task.dueDateTime?.toDateString()}</Text>
      <Card>
        <p>{task.description}</p>
      </Card>
    </div>
  );
};

export default TaskDetailPage;
