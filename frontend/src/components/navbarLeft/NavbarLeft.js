import React from "react";
import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { BsWechat } from "react-icons/bs";
import logo from "../../assets/R.png";
import gojo from "../../assets/gojo1.png";
import { IoIosSettings } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
import "../../styles/navbar.scss";
import useLogout from "../../hooks/useLogout";
import { useDispatch, useSelector } from "react-redux";
import { setProfileOpen } from "../../redux/reducers/utilReducer";
import toast from "react-hot-toast";

const NavbarLeft = ({ onSelectComponent, isMobileView }) => {
  const dispatch = useDispatch();
  const me = JSON.parse(localStorage.getItem("user"));

  const handleLick1 = () => {
    onSelectComponent("MainScreen");
  };

  const handleLick2 = () => {
    // onSelectComponent("UserPage");
    toast.success("Feature incoming");
  };

  const handleLick3 = () => {
    // onSelectComponent("AddUserPage");
    toast.success("feature incoming");
  };

  const profileClickHandler = () => {
    if (!isMobileView) {
      dispatch(setProfileOpen());
    }
  };

  const { loading, logout } = useLogout();

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className="navbar">
      <div className="img-div">
        <img src={logo} alt="logo" className="img" />
      </div>
      <div className="middle-navDiv">
        <div onClick={handleLick1}>
          <GoHomeFill size={24} />
        </div>

        <div onClick={handleLick2}>
          <FaUsers size={24} />
        </div>

        <div onClick={handleLick3}>
          <BsWechat size={24} />
        </div>

        <div className="profile-icon" onClick={profileClickHandler}>
          <img
            src={me.profilepic.secure_url}
            alt="profile"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div onClick={logoutHandler}>
          <CgLogOut size={24} />
        </div>
      </div>
      {/* <div className="nav-bottom"> */}

      {/* </div> */}
    </div>
  );
};

export default NavbarLeft;
