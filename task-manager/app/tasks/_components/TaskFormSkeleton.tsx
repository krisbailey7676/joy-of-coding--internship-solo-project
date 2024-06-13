import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Box } from "@radix-ui/themes";

const TaskFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default TaskFormSkeleton;
