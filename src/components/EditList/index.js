import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateList } from "../../redux/listSlice";
import Modal from "../Modal";
import Task from "../Task";

const EditList = ({ setIsEdited, id, name, task }) => {
  const [listName, setListName] = useState(name);
  const [tasks, setTasks] = useState(task);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim() === "") alert("Please enter list name");
    dispatch(updateList({ id, name: listName, task: tasks }));
    setIsEdited(false);
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="List name" value={listName} onChange={(e) => setListName(e.target.value)} />
        <div className="line" />
        <div>
          {tasks.map((task) => (
            <Task key={task.id} task={task} setTasks={setTasks} tasks={tasks} />
          ))}
        </div>
        <div className="box-btns">
          <button type="button" onClick={() => setIsEdited(false)}>
            CANCEL
          </button>
          <button type="submit" className="action-btn">
            SAVE
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditList;
