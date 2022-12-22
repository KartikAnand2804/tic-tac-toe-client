import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./static/form.css";
import Axios from "axios";
import Cookies from "universal-cookie";

function Register() {
  const cookies = new Cookies();
  const [success, setSuccess] = useState(false);

  // State to store the form data
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // Function to handle form submissions
  const handleRegister = (e) => {
    // e.preventDefault();

    // Send a POST request to the server to create the new user
    Axios.post("http://localhost:5000/api/register", formData).then((res) => {
      const { token, userId, name, username, email, hashedPassword } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("name", name);
      cookies.set("username", username);
      cookies.set("email", email);
      cookies.set("hashedPassword", hashedPassword);
      setSuccess(true);
    });
  };

  // Function to handle changes to the form fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  return (
    <div className="container">
      {/* back chevron */}
      Create Account!
      <h1>Let's get to know you better!</h1>
      <form className="register-form">
        <label htmlFor="name">Your name</label>
        <input
          name="name"
          type="text"
          placeholder="Type your name here"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Type your username here"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Type your email here"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Type your password here"
          value={formData.password}
          onChange={handleChange}
        />
      </form>
      {success ? (
        <div className="success-message">
          <p>Congratulations!!! Account Created.</p>
          <button className="disabled-button">Register</button>
          {setTimeout(() => {
            navigate("/login");
          }, 3000)}
        </div>
      ) : (
        <button
          className="enabled-button"
          onClick={() => {
            handleRegister();
            if (success) navigate("/login");
          }}
        >
          Register
        </button>
      )}
    </div>
  );
}

export default Register;
