import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import TaskFormSkeleton from "./loading";

const TaskForm = dynamic(() => import("@/app/tasks/_components/TaskForm"), {
  ssr: false,
  loading: () => <TaskFormSkeleton />,
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
