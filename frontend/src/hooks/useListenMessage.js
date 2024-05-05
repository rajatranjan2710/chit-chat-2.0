import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  updateNotification,
  updateNotificationCount,
  updatedMessageOnSend,
} from "../redux/reducers/conversationsReducer";
import { useSocketContext } from "../components/context/SocketContext";
import toast from "react-hot-toast";

const useListenMessage = () => {
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const [notify, setNotify] = useState(false);
  const [notificationCount, setNotificationCount] = useState(() => {
    const storedNotificationCount = localStorage.getItem("notification-count");
    return storedNotificationCount ? JSON.parse(storedNotificationCount) : {};
  });
  const { isHomeMounted } = useSelector((state) => state.socket);
  const { messages } = useSelector((state) => state.conversations);

  const { selectedConversation, friends } = useSelector((state) => state.auth);

  useEffect(() => {
    // console.log("flag");
    if (!socket) {
      console.log("not socket");
      return;
    }

    socket.on("message", (messages) => {
      const senderId = messages.senderId;

      //Finding the user which matches to senderId
      const SenderUser = friends.find((friend) => friend._id === senderId);

      console.log("senderId of this new message", senderId);
      if (selectedConversation && selectedConversation._id === senderId) {
        toast.success(`New message from (${SenderUser.fullName})`);
        // console.log(messages.senderId);
        dispatch(updatedMessageOnSend(messages));
      } else {
        console.log("running else part");
        setNotify(true);
        toast.success(`New message from ${SenderUser.fullName}`);
        setNotificationCount((prevCount) => ({
          ...prevCount,
          [senderId]: (prevCount[senderId] || 0) + 1,
        }));
      }
    });

    return () => {
      console.log("unmounting the message");
      socket.off("message");
    };
  }, [
    dispatch,
    selectedConversation,
    messages,
    isHomeMounted,
    notificationCount,
    friends,
  ]);

  useEffect(() => {
    console.log("Running use effect 2");
    if (!selectedConversation) {
      return;
    }
    if (selectedConversation._id) {
      setNotificationCount((prevCount) => ({
        ...prevCount,
        [selectedConversation._id]: 0,
      }));
      // setShouldPersist(true);

      const updatedNotificationCount = { ...notificationCount };
      delete updatedNotificationCount[selectedConversation._id];
      localStorage.setItem(
        "notification-count",
        JSON.stringify(updatedNotificationCount)
      );
    }
  }, [selectedConversation, isHomeMounted, notify]);

  useEffect(() => {
    // Update local storage when notificationCount changes

    localStorage.setItem(
      "notification-count",
      JSON.stringify(notificationCount)
    );
  }, [notify]);

  useEffect(() => {
    // Update Redux store with the updated notificationCount

    dispatch(updateNotification());

    setNotify(false);
  }, [notify]);

  return { notificationCount };
};

export default useListenMessage;
