import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditTaskButton from "./edit/EditTaskButton";
import TaskDetails from "./edit/TaskDetails";

interface Props {
  params: { id: string }; // route parameters
}

const TaskDetailPage = async ({ params }: Props) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!task) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }}>
      <Box>
        <TaskDetails task={task} />
      </Box>
      <Box>
        <EditTaskButton taskId={task.id} />
      </Box>
    </Grid>
  );
};

export default TaskDetailPage;
