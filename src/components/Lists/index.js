import { useState } from "react";
import "./lists.styles.scss";
import ListItem from "../ListItem";
import AddList from "../AddList";

const List = ({ lists }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lists">
      {lists.map((list) => (
        <ListItem key={list.id} list={list} />
      ))}
      <img src="/img/addBtn.png" alt="" onClick={() => setIsOpen(true)} />
      {isOpen && <AddList setIsOpen={setIsOpen} />}
    </div>
  );
};

export default List;
