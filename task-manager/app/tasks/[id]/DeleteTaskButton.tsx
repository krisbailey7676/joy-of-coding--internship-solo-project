"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, IconButton } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteTaskButton = ({ taskId }: { taskId: number }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(false);

  const deleteTask = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/tasks/${taskId}`);
      router.push("/tasks/list");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <IconButton variant="ghost">
            <TrashIcon />
          </IconButton>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex mt="3" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="purple">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="purple" onClick={deleteTask}>
                Delete Task
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This task cannot be deleted.
          </AlertDialog.Description>
          <AlertDialog.Action>
            <Button
              variant="soft"
              mt={"3"}
              onClick={() => {
                setError(false);
              }}
            >
              OK
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteTaskButton;
