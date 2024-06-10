import { Task } from "@prisma/client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditTaskButton = ({ taskId }: { taskId: number }) => {
  return (
    <Button>
      <Pencil1Icon />
      <Link href={`/tasks/${taskId}/edit`}>Edit Task</Link>
    </Button>
  );
};

export default EditTaskButton;
