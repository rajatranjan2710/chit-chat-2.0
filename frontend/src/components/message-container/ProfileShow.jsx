import React from "react";
import LogoutButton from "../sidebar/LogoutButton";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { setProfileOpen } from "../../redux/reducers/utilReducer";
import "../../styles/home.scss";

const ProfileShow = ({ isMobileView }) => {
  const me = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  const backToSideBar = () => {
    dispatch(setProfileOpen());
  };

  const getMemerSince = (data) => {
    return data.split("T")[0];
  };

  return (
    <div className="profile-show">
      <div className="upper-div"></div>
      <div
        className="lower-div"
        style={{
          borderRadius: isMobileView ? "70px 70px 0 0" : "70px 70px 20px 0",
        }}
      >
        {isMobileView && (
          <div onClick={backToSideBar} className="back-button">
            <IoIosArrowBack size={20} />
          </div>
        )}
        <div className="profile-avatar">
          <img
            src={me.profilepic.secure_url}
            alt="gojo"
            style={{
              borderRadius: "50%",
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="profile-info">
          <div
            className="userName"
            style={{ margin: "0 auto", fontSize: "1.2rem", fontWeight: "bold" }}
          >
            {me.userName}
          </div>
          <div style={{ margin: "0 auto" }}>{me.status}</div>
          <div className="fullName">
            <div>Name</div>
            <div>{me.fullName}</div>
          </div>
          <div className="member-since">
            <div>Member Since</div>
            <div>{getMemerSince(me.createdAt ? me.createdAt : 0)}</div>
          </div>
          <div className="friends-count">
            <div>Friends Count</div>
            <div>{me.friends.length}</div>
          </div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default ProfileShow;
