import React from "react";
import "../../styles/home.scss";
import SearchTab from "./SearchTab";
import ConversationContainer from "./ConversationContainer";
import logo from "../../assets/R.png";
import { useSelector } from "react-redux";
import Profile from "./Profile";
// import LogoutButton from "./LogoutButton";
// import Conversations from "./Conversations";

const Sidebar = ({ onConversationClick, isMobileView }) => {
  const { user } = useSelector((state) => state.auth);
  const User = JSON.parse(user);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Profile />
        <div className="sidebar-text">
          <h2>Hi </h2>
          <h5>{User.fullName}</h5>
        </div>
      </div>
      <SearchTab />
      <ConversationContainer
        onConversationClick={onConversationClick}
        isMobileView={isMobileView}
      />
    </div>
  );
};

export default Sidebar;
