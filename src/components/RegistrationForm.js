/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GetToken from "../services/GetToken";
import URL from "../services/URL";

export default function RegistrationForm() {
  let navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const findAllUsersUrl = URL.findAllUsersUrl();
  const createUserUrl = URL.createUserUrl();
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

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  let [userRegistrationError, setUserRegistrationError] = useState();

  const validateForm = () => {
    let errors = {};
    const usernameRegex = /^[a-zA-Z0-9_-]{4,20}$/; 
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    } else if (!usernameRegex.test(formData.username.trim())) {
      errors.username = "Invalid username";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isUsernameTaken = users.some(
      (existingUser) => existingUser.username === formData.username
    );

    if (validateForm()) {
      if (isUsernameTaken) {
        setUserRegistrationError(
          "Username already exists. Please choose a different username."
        );
        return;
      } else {
        setUserRegistrationError("");
      }

      const user = {
        username: formData.username,
        password: formData.password,
        isAdmin: false,
        isActive: true,
      };

      try {
        const response = await axios.post(createUserUrl, user, config);
        if (response.data.message === "Document created successfully") {
          navigate("/registration-success");
        } else {
          setUserRegistrationError(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="registration-form">
      <h2 className="registration-title">Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <p>
            You can use 4 or more characters with a mix of letters, numbers,
            underscores and hyphens{" "}
          </p>
          <input
            className="input"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <div className="error">
            {formErrors.username && <span>{formErrors.username}</span>}
            <br />
            {userRegistrationError && <span>{userRegistrationError}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="error">
            {formErrors.password && <span>{formErrors.password}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            className="input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <div className="error">
            {formErrors.confirmPassword && (
              <span>{formErrors.confirmPassword}</span>
            )}
          </div>
        </div>
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}
