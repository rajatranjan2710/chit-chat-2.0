import React from "react";
import ContainerHeader from "./ContainerHeader";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { useSelector } from "react-redux";

const MessageContainer = ({ isMobileView, onBackToSidebar }) => {
  const { isProfileOpen } = useSelector((state) => state.util);
  return (
    <div
      className="messageContainer"
      style={{
        width: isProfileOpen ? "45%" : "70%",
        borderRadius: isProfileOpen ? 0 : "0px 20px 0 0",
      }}
    >
      <ContainerHeader
        isMobileView={isMobileView}
        onBackToSidebar={onBackToSidebar}
      />
      <Messages />
      <SendMessage />
    </div>
  );
};

export default MessageContainer;
