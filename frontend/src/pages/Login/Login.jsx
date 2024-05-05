import React, { useState } from "react";
import "../../styles/signup.scss";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import Loader from "../../components/Loader";

const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleChange = (e) => {
    // console.log("working");
    // console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="Login-container">
      <h1>Welcome back!!</h1>
      <h4>Log in into your account</h4>
      <form
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
        onSubmit={handleSumbit}
      >
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={formData.userName}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <Link
        to="/signup"
        style={{
          fontWeight: "500",
          fontSize: "10",
          textDecoration: "none",
          color: "gray",
        }}
        className="link"
      >
        Don't have an account
      </Link>
    </div>
  );
};

export default Login;
