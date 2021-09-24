import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./home.styles.scss";
import { fetchLists } from "../../redux/listSlice";
import { setUser } from "../../redux/userSlice";
import SearchBar from "../../components/SearchBar";
import SortBtn from "../../components/SortBtn";
import Lists from "../../components/Lists";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");

    if (loggedInUser) {
      dispatch(setUser());
    } else {
      history.push("/signin");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  const { lists } = useSelector((state) => state.list);

  if (!lists) return <div className="loading">Loading...</div>;

  return (
    <>
      <div className="list-header">
        <SearchBar />
        <SortBtn />
      </div>
      <Lists lists={lists} />
    </>
  );
};

export default Home;
