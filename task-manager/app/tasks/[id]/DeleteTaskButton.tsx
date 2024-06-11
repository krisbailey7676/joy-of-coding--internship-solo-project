import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";

const DeleteTaskButton = ({ taskId }: { taskId: number }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button>Delete Task</Button>
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
            <Button color="purple">Delete Task</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteTaskButton;
