import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import "./header.styles.scss";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { authenticated } = useSelector((state) => state.user);

  return (
    <header>
      <h1>ToDo-List</h1>
      {authenticated && (
        <img
          src="/img/logout.png"
          alt=""
          onClick={() => {
            dispatch(logout());
            history.push("/signin");
          }}
        />
      )}
    </header>
  );
};

export default Header;
