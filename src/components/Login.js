import React, { useState } from "react";
// import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import Axios from "axios";
import "./static/form.css";

function Login({ setIsAuth }) {
  // State to store the form data
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  // Function to handle form submissions
  const cookies = new Cookies();

  const handleLogin = async (e) => {
    // e.preventDefault();
    Axios.post("http://localhost:5000/api/login", loginFormData).then((res) => {
      const { token, userId, username, name, email } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("name", name);
      cookies.set("email", email);
      setIsAuth(true);
    });
  };

  // Function to handle changes to the form fields
  const handleChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  // const navigate = useNavigate();
  return (
    <div className="container">
      {/* back chevron */}
      Login
      <h1>Please enter your details</h1>
      <form className="login-form">
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Type your username here"
          value={loginFormData.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Type your password here"
          value={loginFormData.password}
          onChange={handleChange}
        />
      </form>
      {/* {loginError && (
        <div className="login-error-message">Enter correct details.</div>
      )} */}
      <button className="login-enabled-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
