import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "./signUp.styles.scss";
import { signUp } from "../../redux/userSlice";

const SignUp = () => {
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
    watch,
  } = useForm();

  const onSubmit = ({ username, email, password }) => {
    dispatch(signUp({ username, email, password }));
  };

  return (
    <div className="box signup">
      <img src="/img/arrow.png" alt="" onClick={() => history.goBack()} />
      <h1>Create an new account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <input type="text" {...register("username", { required: true })} placeholder="Username" />
          {errors.username && <div className="error-msg">Please enter a username</div>}
        </div>
        <div className="field">
          <input type="email" {...register("email", { required: true })} placeholder="Email" />
          {errors.email && <div className="error-msg">Please enter a valid email</div>}
        </div>
        <div className="field">
          <input type="password" {...register("password", { required: true })} placeholder="Password" />
          {errors.password && <div className="error-msg">Please enter a valid password</div>}
        </div>
        <div className="field">
          <input
            {...register("confirmPassword", {
              validate: (value) => value === watch("password"),
            })}
            type="password"
            placeholder="Repeat password"
          />
          {errors.confirmPassword && <div className="error-msg">Passwords do not match</div>}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default SignUp;
