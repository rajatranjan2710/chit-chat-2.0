import React, { useState } from "react";
import "../../styles/login.scss";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";
import Loader from "../../components/Loader";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
    avatar: null,
    avatarPreview: null,
  });

  // Using useEffect to check weather user is login or not

  const { loading, signUplol } = useSignUp();

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      console.log("Uploading");
      const file = e.target.files[0];
      setFormData({
        ...formData,
        avatar: e.target.files[0],
      });
      // Create preview image URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: e.target.files[0],
          avatarPreview: reader.result,
        });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    await signUplol(formData);
  };

  return loading ? (
    <Loader />
  ) : (
    // <div className="wrapper">
    <div className="container">
      <h1>Get Started</h1>
      <h4>Create a new account</h4>
      <form onSubmit={submitHandler}>
        {formData.avatarPreview && (
          <img
            src={formData.avatarPreview}
            alt="Avatar"
            className="avatar-thumbnail"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}

        <input
          type="text"
          placeholder="Full name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Username"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <label
          className="file-input-label"
          style={{
            marginTop: "0.5rem",
            display: "inline-block",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <span>Upload Profile</span>
          <input
            type="file"
            name="avatar"
            onChange={handleChange}
            className="file-input"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: "pointer",
            }}
          />
        </label>
        <div className="radio-container">
          <div>
            <input
              type="radio"
              name="gender"
              value="Male"
              id="male"
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              name="gender"
              value="Female"
              id="female"
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/" style={{ textDecoration: "none", color: "gray" }}>
        Already have an account
      </Link>
    </div>
    // </div>
  );
};

export default SignUp;
