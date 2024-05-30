import axios from "axios";
import React from "react";
import TaskTable from "./TaskTable";

const TaskListPage = async () => {
  //   const tasks = await axios.get("api/tasks");
  return (
    <div>
      TaskListPage
      <TaskTable />
    </div>
  );
};

export default TaskListPage;
