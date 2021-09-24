import { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import "./listItem.styles.scss";
import { deleteList } from "../../redux/listSlice";
import EditList from "../EditList";

const ListItem = ({ list }) => {
  const { id, name, created_at, task } = list;
  const [isEdited, setIsEdited] = useState(false);

  const completed = task.filter((item) => item.isDone === true).length;
  const unCompleted = task.filter((item) => item.isDone === false).length;

  const dispatch = useDispatch();

  return (
    <>
      <div className="list-item" onClick={() => setIsEdited(true)}>
        <div>
          <b>{name}</b>
        </div>
        <div>
          <i>Created at: {moment(created_at).utc().format("DD-MM-YYYY")}</i>
        </div>
        <div>
          Completed: {completed} Uncompleted: {unCompleted} All: {task.length}{" "}
          <i
            className="fas fa-times"
            onClick={(e) => {
              dispatch(deleteList(id));
              e.stopPropagation();
            }}
          />
        </div>
      </div>
      {isEdited && <EditList setIsEdited={setIsEdited} {...list} />}
    </>
  );
};

export default ListItem;
