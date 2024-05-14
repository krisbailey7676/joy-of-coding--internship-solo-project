import Link from "next/link";
import React from "react";
import { FcTodoList } from "react-icons/fc";

const NavBar = () => {
  return (
    <nav className="flex space-x-5 h-10 border-b-2 border-purple-800 max-w-md mb-7 px-5 items-center">
      <Link href="/">
        <FcTodoList className="text-2xl" />
      </Link>
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Dashboard</Link>
        </li>
        <li>
          <Link href="/tasks">Tasks</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
