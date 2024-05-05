import React from "react";
// import img1 from "../../assets/img1.jpg";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updatedSelecctedConversation } from "../../redux/reducers/authReducer";

const Conversations = ({ item, onConversationClick, isMobileView }) => {
  const dispatch = useDispatch();
  const { onlineUsers } = useSelector((state) => state.socket);

  // if the online users include the props.item._id their online status is true
  const isOnline = onlineUsers.includes(item._id);

  //for notification
  const notification = localStorage.getItem("notification-count");
  const parsedNotification = notification ? JSON.parse(notification) : {};
  const conversationNotification = parsedNotification[item._id] || 0;

  // selectedChat or not
  const { selectedConversation } = useSelector((state) => state.auth);
  const isSelected =
    selectedConversation && selectedConversation._id === item._id;

  const clickHandler = (_id) => {
    dispatch(updatedSelecctedConversation(_id));
    if (isMobileView) {
      onConversationClick();
    }
  };
  // console.log("item is: ", item);

  return (
    <>
      <div
        className={`conversations ${isSelected ? "selected" : ""}`}
        onClick={() => clickHandler(item._id)}
      >
        <div className="img">
          <img
            className="avatar"
            src={item.profilepic.secure_url}
            alt="img1"
            style={{ objectFit: "cover" }}
          />
          <div className={`${isOnline ? "onlineStatus" : ""}`}></div>
        </div>
        <div className="name-container">
          <div className="name">{item.fullName}</div>
          {conversationNotification > 0 && (
            <div className="plus-messages">
              {conversationNotification}+ new messages
            </div>
          )}
        </div>

        {conversationNotification > 0 && (
          <div className="notification">{conversationNotification}</div>
        )}
      </div>
      {/* <div className="line"></div> */}
    </>
  );
};

export default Conversations;
