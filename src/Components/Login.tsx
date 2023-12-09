import React, { useState } from "react";
import "../CSS/loginPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { userActions } from "../Store/store";

function Login() {
  const dispatch = useDispatch();
  const [loginData, setLogindata] = useState({ userName: "", password: "" });

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  type usersListType = { name: string; email: string; password: string };

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if ((event.target.type = "password")) {
      event.target.type = "text";
      setTimeout(() => {
        event.target.type = "password";
      }, 500);
    }

    setLogindata(prev => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let usersList: string | null = localStorage.getItem("usersList");
    if (usersList) {
      let usersList1 = JSON.parse(usersList);
      let output = usersList1.some((item: usersListType) => {
        return (
          item.name == loginData.userName && item.password == loginData.password
        );
      });

      if (output) {
        dispatch(
          userActions.login(`${loginData.userName}${loginData.password}`)
        );
        setError(false);
      }
      output &&
        navigate(`Users?user=${loginData.userName}${loginData.password}`, {
          replace: true,
        });
    }
    if (!usersList) {
      setError(true);
    }
  }
  return (
    <div id="loginPage">
      <form id="loginForm" onSubmit={submitHandler}>
        <span className="error" style={{ display: error ? "block" : "none" }}>
          Invalid Username or Password
        </span>
        <div>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            name="userName"
            onChange={changeHandler}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <div>
            <input
              type="password"
              name="password"
              onChange={changeHandler}
              required
            />
          </div>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div id="signUp">
          <a href="register">Sign Up/Register</a>
          <a href="#">Forgot Password</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
