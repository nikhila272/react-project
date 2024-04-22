/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authReducer";
import GetToken from "../services/GetToken";
import URL from "../services/URL";

export default function Login() {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [users, setUsers] = useState([]);

  const findAllUsersUrl = URL.findAllUsersUrl();
  const token = GetToken.returnToken();
  const config = { headers: { Authorization: `${token}` } };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(findAllUsersUrl, config);
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  const handleLogin = (username, password) => {
    const storedUsers = users || [];
    const user = storedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      const userData = {
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
      };

      const username = user.username;
      const _id = user._id;
      const isAdmin = user.isAdmin;
      dispatch(
        authActions.login({
          username,
          _id,
          isAdmin,
        })
      );

      localStorage.setItem("userData", JSON.stringify(userData));
      console.log(
        "User Data _id: " +
          userData._id +
          " username: " +
          userData.username +
          " admin: " +
          userData.isAdmin
      );
      navigate("/");
    } else {
      setErrorMsg("Invalid Username or Password. Please try again");
    }
  };
  return (
    <div className="login-form">
      <h2>Login to ProductPulse</h2> {/* Updated website name */}
      <br />
      <div className="error">{errorMsg}</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            className="input"
            type="text"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            className="input"
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Login" onClick={handleSubmit} />
      </form>
      <div>
        <span>Don't have an account? </span>
        <Link to="/register">Register here</Link>
      </div>
    </div>
  );
}
