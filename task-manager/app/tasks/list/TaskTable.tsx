import TaskStatusBadge from "@/app/components/TaskStatusBadge";
import prisma from "@/prisma/client";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, IconButton, Table } from "@radix-ui/themes";
import { sort } from "fast-sort";
import Link from "../../components/Link";
import DeleteTaskButton from "../[id]/DeleteTaskButton";
import EditTaskButton from "../[id]/EditTaskButton";
import TaskDetails from "../[id]/TaskDetails";

interface Props {
  sortOrder: string;
}

const taskTable = async ({ sortOrder }: Props) => {
  const tasks = await prisma.task.findMany();

  //task sorting default is by title
  const sortedTasks = sort(tasks).asc(
    sortOrder === "dueDateTime"
      ? (task) => task.dueDateTime
      : sortOrder === "status"
        ? (task) => task.status
        : (task) => task.title
  );

  return (
    <div className="pr-5">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <Link href="/tasks/list?sortOrder=name">Task</Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              <Link href="/tasks/list?sortOrder=status">Status</Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              <Link href="/tasks/list?sortOrder=dueDateTime">
                Due Date/Time
              </Link>
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedTasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>
                <DeleteTaskButton taskId={task.id} />
              </Table.Cell>
              <Table.Cell>
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button variant="ghost">{task.title}</Button>
                  </Dialog.Trigger>
                  <Dialog.Content maxWidth="450px">
                    <Flex justify={"end"}>
                      <Dialog.Close>
                        <IconButton color="red" size="2">
                          <Cross1Icon />
                        </IconButton>
                      </Dialog.Close>
                    </Flex>
                    <Flex direction="column" gap="4" maxHeight="250px">
                      <TaskDetails task={task} />
                    </Flex>
                    <Flex justify={"center"} mt={"4"}>
                      <EditTaskButton taskId={task.id} />
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>
                <div className="block md:hidden">
                  <TaskStatusBadge status={task.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <TaskStatusBadge status={task.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {task.dueDateTime?.toLocaleString()}
              </Table.Cell>
              {/* <Table.Cell>
                <DeleteTaskButton taskId={task.id} />
              </Table.Cell> */}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default taskTable;
