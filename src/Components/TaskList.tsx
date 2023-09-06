import "../style/taskList.css";
import TaskItem from "./TaskItem";

import { TaskListProps } from "../utility/type";

function TaskList({ tasks, onDelete, onUpdate }: TaskListProps) {
  return (
    <div className="task-list">
      {tasks.map((task, index) => {
        return (
          <TaskItem
            task={task}
            key={index}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        );
      })}
    </div>
  );
}

export default TaskList;
