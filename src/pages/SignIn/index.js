import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { signIn } from "../../redux/userSlice";
import "./signIn.styles.scss";

const SignIn = () => {
  const history = useHistory();

  const { authenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (authenticated) history.push("/");
  }, [authenticated, history]);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ identifier, password }) => {
    dispatch(signIn({ identifier, password }));
  };

  return (
    <div className="box">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <input type="text" {...register("identifier", { required: true })} placeholder="Email or Username" />
          {errors.identifier && <div className="error-msg">Please enter a valid email or username</div>}
        </div>
        <div className="field">
          <input type="password" {...register("password", { required: true })} placeholder="Password" />
          {errors.password && <div className="error-msg">Please enter a valid password</div>}
        </div>
        <button type="submit">Login</button>
      </form>
      <p>or</p>
      <Link to="/signup">create an account</Link>
    </div>
  );
};

export default SignIn;
