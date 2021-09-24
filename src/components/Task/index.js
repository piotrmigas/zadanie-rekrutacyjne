import { useState } from "react";
import "./task.styles.scss";

const Task = ({ task, setTasks, tasks }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [isDone, setIsDone] = useState(task.isDone);
  const [name, setName] = useState(task.name);

  const editTask = () => {
    if (name.trim() === "") alert("Please enter a task name");
    setTasks(tasks.map((item) => (item.id === task.id ? { ...task, name, isDone } : task)));
    setIsEdited(false);
  };

  const cancelTask = () => {
    setName(task.name);
    setIsDone(task.isDone);
    setIsEdited(false);
  };

  return isEdited ? (
    <>
      <div className="task">
        <label className="custom-checkbox">
          <input type="checkbox" checked={isDone} onChange={(e) => setIsDone(e.target.checked)} />
          <span />
        </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Task name" />
      </div>
      <div className="task-btns">
        <button className="cancel-btn" type="button" onClick={cancelTask}>
          CANCEL
        </button>
        <button className="action-btn" type="button" onClick={editTask}>
          ADD
        </button>
      </div>
    </>
  ) : (
    <div className="task hov" onClick={() => setIsEdited(true)}>
      <label className="custom-checkbox">
        <input type="checkbox" disabled checked={isDone} onChange={(e) => setIsDone(e.target.checked)} />
        <span />
      </label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
};

export default Task;
