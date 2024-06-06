import React from "react";
import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "violet" | "yellow" | "green" | "red" }
> = {
  NEW: { label: "New", color: "violet" },
  IN_PROGRESS: { label: "In Progress", color: "yellow" },
  OVERDUE: { label: "Overdue", color: "red" },
  COMPLETE: { label: "Complete", color: "green" },
};

const TaskStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default TaskStatusBadge;
