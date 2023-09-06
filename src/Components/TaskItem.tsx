import "../style/taskItem.css";

import { useState } from "react";
import TaskCreate from "./TaskCreate";

function TaskItem({ task, onDelete, onUpdate }: any) {
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const handleDeleteClick = () => {
    onDelete(task.id);
  };

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleSubmit = (
    id: number,
    updatedTitle: string,
    updatedTaskDesc: string
  ) => {
    setShowEdit(false);
    onUpdate(id, updatedTitle, updatedTaskDesc);
  };

  return (
    <div className="taskItem">
      {showEdit ? (
        <TaskCreate task={task} taskFormUpdate={true} onUpdate={handleSubmit} />
      ) : (
        <div>
          <h3>Task Başlığınız </h3>
          <p>{task.title}</p>
          <h3>Task</h3>
          <p>{task.titleDesc}</p>
          <div>
            <button onClick={handleDeleteClick}>Sil</button>
            <button onClick={handleEditClick}>Güncelle</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
