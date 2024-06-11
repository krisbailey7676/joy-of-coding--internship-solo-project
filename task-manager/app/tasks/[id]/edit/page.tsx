import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
// import TaskForm from "../../_components/TaskForm";

const TaskForm = dynamic(() => import("@/app/tasks/_components/TaskForm"), {
  ssr: false,
  // loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditTaskPage = async ({ params }: Props) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) notFound();

  return <TaskForm task={task} />;
};

export default EditTaskPage;
