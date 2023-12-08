import React, { useState } from "react";
import "../CSS/registerPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { signUpActions } from "../Store/store";

function Register() {
  const register = signUpActions.register;
  const usersList = useSelector((state: any) => {
    return state.register;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserdata] = useState({
    name: "",
    password: "",
    mobileNo: "",
    email: "",
    medicalName: "",
    address: "",
  });

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setUserdata(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(
      register({
        data: userData,
        userName: `${userData.name}${userData.password}`,
        userData: { ...userData, medicineList: [] },
      })
    );
    console.log(usersList);

    // let users = localStorage.getItem("usersList");

    // if (users) {
    //   let parseUsersList = JSON.parse(users);
    //   parseUsersList.push(userData);
    //   localStorage.setItem("usersList", JSON.stringify(parseUsersList));
    //   localStorage.setItem(
    //     `${userData.name}${userData.password}`,
    //     JSON.stringify({ ...userData, medicineList: [] })
    //   );
    // } else {
    //   localStorage.setItem("usersList", JSON.stringify([userData]));
    //   localStorage.setItem(
    //     `${userData.name}${userData.password}`,
    //     JSON.stringify({ ...userData, medicineList: [] })
    //   );
    // }
    // console.log(userData);
    navigate("/", { replace: true });
  }
  return (
    <div id="registerPage">
      <form id="registerInfo" onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            name="name"
            placeholder="Set Username"
            onChange={event => changeHandler(event)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={event => changeHandler(event)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            placeholder="Set a Password"
            onChange={event => changeHandler(event)}
            required
          />
        </div>

        <div>
          <label htmlFor="mobile">Mobile No.</label>
          <input
            type="text"
            name="mobileNo"
            onChange={event => changeHandler(event)}
            required
          />
        </div>
        <div>
          <label htmlFor="medicalName">Medical Name</label>
          <input
            type="text"
            name="medicalName"
            onChange={event => changeHandler(event)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            onChange={event => changeHandler(event)}
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
