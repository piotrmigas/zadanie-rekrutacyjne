import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./searchBar.styles.scss";
import { clearSearch, searchLists } from "../../redux/listSlice";

const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (name.trim() === "") dispatch(clearSearch());
    dispatch(searchLists(name));
  }, [name, dispatch]);

  return (
    <input type="text" placeholder="Search" value={name} onChange={(e) => setName(e.target.value)} id="search-bar" />
  );
};

export default SearchBar;
