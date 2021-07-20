import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp } from "../actions/auth";
function Login() {
  const dispatch = useDispatch();

  const history = useHistory();
  const initialData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [signup, setSignup] = useState(false);

  let error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: "ERROR", payload: null });
      }, 4000);
    }
  }, [error]);

  const SwitchMode = () => {
    setSignup((preValue) => !preValue);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (signup) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
  };

  useEffect(() => {
    dispatch({ type: "END_LOADING" });
  }, []);

  return (
    <div className="loginScreen">
      <div className="login__container">
        {error && <p className="error__message">{error}</p>}

        <h1>{signup ? "Sign Up" : "Login"}</h1>

        <form onSubmit={handleSubmit} className="login__form">
          {signup && (
            <>
              <label>Name</label>
              <input
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Enter Name"
              />
            </>
          )}
          <label>Email Address</label>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Enter Email"
          />
          <label>Password</label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Enter Password"
          />
          {signup && (
            <>
              <label>Confirm Password</label>
              <input
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
            </>
          )}
          <button className="login__button" type="submit">
            {signup ? "SignUp" : "Login"}
          </button>
          <button className="login__withGoogle" type="submit">
            {signup ? "SignUp with Google" : "Login with Google"}
          </button>
        </form>
        <p>
          {signup ? "Already Have an Account" : "Don't Have an account"}
          <span className="sign__button" onClick={SwitchMode}>
            <Link>{signup ? "Login" : "Sign Up"}</Link>
          </span>
        </p>
      </div>
      <div className="loginBg__fade" />
    </div>
  );
}

export default Login;
