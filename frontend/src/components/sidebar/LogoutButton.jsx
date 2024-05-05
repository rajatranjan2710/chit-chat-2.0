import React from "react";
import "../../styles/home.scss";
import useLogout from "../../hooks/useLogout";
import Loader from "../Loader";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  const logoutHandler = () => {
    logout();
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="logout-button">
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default LogoutButton;
