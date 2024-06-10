import TaskStatusBadge from "@/app/components/TaskStatusBadge";
import { Task } from "@prisma/client";
import { Flex, Heading, Card, Text, TextArea } from "@radix-ui/themes";
import React from "react";

const TaskDetails = ({ task }: { task: Task }) => {
  return (
    <>
      <Flex gap="3" my="2" align="center">
        <Heading>{task.title}</Heading>
        <TaskStatusBadge status={task.status} />
      </Flex>
      <Text>{`Due: ${task.dueDateTime?.toDateString()}`}</Text>
      <Card>
        <TextArea>{task.description}</TextArea>
      </Card>
    </>
  );
};

export default TaskDetails;
