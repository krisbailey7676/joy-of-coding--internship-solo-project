import TaskStatusBadge from "@/app/components/TaskStatusBadge";
import { Task } from "@prisma/client";
import {
  Flex,
  Heading,
  Card,
  Text,
  TextArea,
  ScrollArea,
} from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const TaskDetails = ({ task }: { task: Task }) => {
  return (
    <>
      <Flex gap="3" my="2" align="center">
        <Heading>{task.title}</Heading>
        <TaskStatusBadge status={task.status} />
      </Flex>
      <Text>{`Due: ${task.dueDateTime?.toDateString()}`}</Text>
      <ScrollArea scrollbars="vertical" type="auto">
        <Card className="prose max-w-full">
          <ReactMarkdown>{task.description}</ReactMarkdown>
        </Card>
      </ScrollArea>
    </>
  );
};

export default TaskDetails;
