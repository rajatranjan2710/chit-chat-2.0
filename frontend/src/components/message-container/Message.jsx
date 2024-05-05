import React from "react";
import { useSelector } from "react-redux";

const Message = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  const { selectedConversation } = useSelector((state) => state.auth);
  // console.log(user);
  const newUser = JSON.parse(user);

  const isCurrentUser = item.senderId === newUser._id;

  return (
    <div className={`chat-bubble-${isCurrentUser ? "sender" : "reciever"}`}>
      <div className="name">{item.messages}</div>
      <div style={{ height: "2.5rem", width: "2.5rem" }}>
        <img
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
          src={
            isCurrentUser
              ? newUser.profilepic.secure_url
              : selectedConversation.profilepic.secure_url
          }
          alt="gojo"
        />
      </div>
    </div>
  );
};

export default Message;
