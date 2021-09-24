import { useDispatch, useSelector } from "react-redux";
import "./sortBtn.styles.scss";
import { toggleSortByDate } from "../../redux/listSlice";

const SortBtn = () => {
  const dispatch = useDispatch();
  const { isOldestFirst } = useSelector((state) => state.list);

  return (
    <button onClick={() => dispatch(toggleSortByDate())}>
      <p>
        <img src="/img/polygon.png" alt="" className={`${!isOldestFirst && "rotated"}`} />
        Sort by
      </p>
    </button>
  );
};

export default SortBtn;
