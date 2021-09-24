import { useState } from "react";
import { useDispatch } from "react-redux";
import "./addList.styles.scss";
import Modal from "../Modal";
import { addList } from "../../redux/listSlice";

const AddList = ({ setIsOpen }) => {
  const [listName, setListName] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);

  const dispatch = useDispatch();

  const addTask = () => {
    if (taskName.trim() === "") alert("Please enter a task name");
    setTasks([...tasks, { name: taskName, isDone }]);
    setTaskName("");
    setIsDone(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim() === "") {
      alert("Please enter a list name");
    }
    if (!tasks.length) {
      alert("Please add task");
    }
    if (listName && tasks.length) {
      dispatch(addList({ name: listName, task: tasks }));
      setListName("");
      setIsOpen(false);
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="List name" value={listName} onChange={(e) => setListName(e.target.value)} />
        <div className="line" />
        <div className="add-task">
          <div className="inputs">
            <label className="custom-checkbox">
              <input type="checkbox" checked={isDone} onChange={(e) => setIsDone(e.target.checked)} />
              <span />
            </label>
            <input type="text" placeholder="Task name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
          </div>
          <div className="btns">
            <button
              className="cancel-btn"
              type="button"
              onClick={() => {
                setTaskName("");
                setIsDone(false);
              }}
            >
              CANCEL
            </button>
            <button type="button" onClick={addTask} className="action-btn">
              ADD
            </button>
          </div>
        </div>
        <div className="box-btns">
          <button type="button" onClick={() => setIsOpen(false)}>
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

export default AddList;
