import TaskCreate from "./Components/TaskCreate";
import TaskList from "./Components/TaskList";
import "./App.css";

import { useEffect, useState } from "react";
import { taskType } from "./utility/type";

import axios from "axios";

function App() {
  const [tasks, setTasks] = useState<taskType[]>([]);
  const createTask = async (title: string, titleDesc: string) => {
    // * Post method
    const response = await axios.post("http://localhost:3000/tasks", {
      title,
      titleDesc,
    });
    console.log(response);
    const createdTask = [...tasks, response.data];
    setTasks(createdTask);
  };

  // * Get Method

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3000/tasks");
    setTasks(response.data);
    console.log(response);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (nameToId: number) => {
    // * Delete method
    await axios.delete(`http://localhost:3000/tasks/${nameToId}`);
    setTasks(
      tasks.filter((task) => {
        return task.id !== nameToId;
      })
    );
  };

  const editTaskById = async (
    id: number,
    updatedTitle: string,
    updatedTask: string
  ) => {
    // *Edit method
    await axios.put(`http://localhost:3000/tasks/${id}`, {
      title: updatedTitle,
      titleDesc: updatedTask,
    });
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { id: id, title: updatedTitle, titleDesc: updatedTask };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <TaskCreate onCreate={createTask} />
      <h1>Tasklar</h1>
      <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={editTaskById} />
    </div>
  );
}

export default App;
