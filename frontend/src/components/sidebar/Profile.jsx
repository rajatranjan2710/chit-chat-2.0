import React from "react";
import gojo1 from "../../assets/gojo1.png";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setProfileOpen } from "../../redux/reducers/utilReducer";
import useMe from "../../hooks/useMe";

const Profile = () => {
  // const { me } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  // const user = JSON.parse()
  // console.log("me in profile : ", me);
  const dispatch = useDispatch();
  useMe();

  const profileOpenHandler = () => {
    dispatch(setProfileOpen());
  };

  return (
    <div className="profile" onClick={profileOpenHandler}>
      {" "}
      <img
        src={user ? user.profilepic.secure_url : gojo1}
        alt={"gojo"}
        style={{
          height: "100%",
          borderRadius: "50%",
          width: "100%",
          objectFit: "cover",
        }}
      />{" "}
    </div>
  );
};

export default Profile;
