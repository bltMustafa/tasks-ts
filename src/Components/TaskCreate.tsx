import "../style/taskCreate.css";

import { taskType } from "../utility/type";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

function TaskCreate({ onCreate, task, taskFormUpdate, onUpdate }: any) {
  const [title, setTitle] = useState<string>(task ? task.title : "");
  const [titleDesc, setTitleDesc] = useState<string>(
    task ? task.titleDesc : ""
  );
  const [titleList, setTitleList] = useState<taskType[]>([]);
  const [error, setError] = useState<string>("");

  let taskIdCounter = 0;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTaskChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitleDesc(event.target.value);
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    
    if (!title.trim() || !titleDesc.trim()) {
      setError("Başlık ve Task alanları boş bırakılamaz.");
      return;
    }

    const newTitle = { id: taskIdCounter, title: title, titleDesc: titleDesc };
    if (taskFormUpdate) {
      onUpdate(task.id, title, titleDesc);
    } else {
      onCreate(title, titleDesc);
    }
    setTitleList([...titleList, newTitle]);
    setTitle("");
    setTitleDesc("");
  };

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setError("");
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  return (
    <>
      {taskFormUpdate ? (
        <div className="taskUpdate">
          <h3>Lütfen Taskı Düzenleyiniz. </h3>
          <form className="task-form" onSubmit={handleSubmit}>
            <h5>Başlığı Düzenleyiniz. </h5>
            <input
              type="text"
              value={title}
              onChange={handleChange}
              placeholder="Lütfen Task Başlığını Giriniz."
              className="taskInput"
            />
            <h5>Taskı Düzenleyiniz.</h5>
            <textarea
              rows={5}
              value={titleDesc}
              onChange={handleTaskChange}
              placeholder="Lütfen Task İçeriğini Giriniz."
              className="taskInput"
            />
            <button type="submit" style={{ marginTop: "9px" }}>
              Düzenle
            </button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      ) : (
        <div className="taskShow">
          <h3>Günlük Tasklar</h3>
          <form className="task-form" onSubmit={handleSubmit}>
            <h3>Başlık</h3>
            <input
              type="text"
              value={title}
              onChange={handleChange}
              placeholder="Lütfen Task Başlığını Giriniz."
            />
            <h3>Task Giriniz.</h3>
            <textarea
              rows={5}
              value={titleDesc}
              onChange={handleTaskChange}
              placeholder="Lütfen Task İçeriğini Giriniz."
            />

            <button type="submit">Oluştur</button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      )}
    </>
  );
}

export default TaskCreate;
