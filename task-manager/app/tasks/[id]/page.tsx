import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditTaskButton from "./EditTaskButton";
import TaskDetails from "./TaskDetails";
import DeleteTaskButton from "./DeleteTaskButton";

interface Props {
  params: { id: string }; // route parameters
}

const TaskDetailPage = async ({ params }: Props) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!task) notFound();

  return (
    <Grid>
      <Box maxWidth={"30rem"} mb={"3"}>
        <Flex direction={"column"} gap={"2"}>
          <TaskDetails task={task} />
        </Flex>
      </Box>
      <Box>
        <EditTaskButton taskId={task.id} />
      </Box>
    </Grid>
  );
};

export default TaskDetailPage;
