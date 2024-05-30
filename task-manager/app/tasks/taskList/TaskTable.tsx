// import { sort } from "fast-sort";
import Link from "next/link";
import React from "react";

interface Task {
  id: number;
  title: string;
  description: string;
}

// interface Props {
//   sortOrder: string;
// }

const taskTable = async () => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks: Task[] = await res.json();

  //   const sortedUsers = sort(users).asc(
  //     sortOrder === "email" ? (user) => user.email : (user) => user.name
  //   );
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            {/* <Link href="/users?sortOrder=name">Name</Link> */}
            <Link href="">Task Id</Link>
          </th>
          <th>
            {/* <Link href="/users?sortOrder=email">Email</Link> */}
            <Link href="">Title</Link>
          </th>
          <th>
            {/* <Link href="/users?sortOrder=email">Email</Link> */}
            <Link href="">Description</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default taskTable;
