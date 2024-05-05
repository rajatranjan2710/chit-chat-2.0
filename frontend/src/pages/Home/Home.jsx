import React, { useEffect, useState } from "react";
import "../../styles/home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/message-container/MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import ProfileShow from "../../components/message-container/ProfileShow";
import PlaceholderComponent from "../../components/PlaceholderComponent";
import { useSocketContext } from "../../components/context/SocketContext";
import {
  isHomeMounted,
  setOnlineUsers,
} from "../../redux/reducers/socketReducer";
import toast from "react-hot-toast";
import NavbarLeft from "../../components/navbarLeft/NavbarLeft";

import UserPage from "../UserPage";
import LandingPage from "../LandingPage";

import MainScreen from "../../components/refactor-components/MainScreen";
import useMe from "../../hooks/useMe";
import useGetConversations from "../../hooks/useGetConversation";
import useListenMessage from "../../hooks/useListenMessage";

const Home = () => {
  const { isProfileOpen } = useSelector((state) => state.util);
  const { messages, conversations, selectedConversation } = useSelector(
    (state) => state.conversations
  );
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const { meLoading } = useMe();
  useListenMessage();
  // useGetConversations();

  const [selectedComponent, setSelectedComponent] = useState("MainScreen");
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Check initial width

    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener
    };
  }, []);

  const handleSelectComponent = (componentName) => {
    setSelectedComponent(componentName);
  };

  //For Notification

  useEffect(() => {
    // console.log("using home useEffect");
    if (socket) {
      socket.on("getOnlineUsers", (users) => {
        // console.log("io from server in home :", users);
        dispatch(setOnlineUsers(users));
      });
    }
  }, [socket, dispatch]);

  // useListenMessage();

  useEffect(() => {
    dispatch(isHomeMounted());
  }, [dispatch]);
  //trial code

  useEffect(() => {
    if (socket) {
      socket.on("message", (messages) => {
        const senderId = messages.senderId;

        const ConversationToFind = conversations.find(
          (conversation) => conversation._id === senderId
        );

        if (!ConversationToFind) {
          return;
        }

        if (!selectedConversation) {
          toast.success(`New message from ${ConversationToFind.fullName}`);
        }
      });

      return () => {
        socket.off("message");
      };
    }
  }, [dispatch, messages, socket]);

  // useListenMessage();

  return (
    <div className="home">
      <NavbarLeft
        onSelectComponent={handleSelectComponent}
        isMobileView={isMobileView}
      />

      {selectedComponent === "MainScreen" && <MainScreen />}

      {selectedComponent === "LandingPage" && <LandingPage />}
      {selectedComponent === "UserPage" && <UserPage />}
      {/* <Sidebar />
      {isProfileOpen ? (
        <ProfileShow />
      ) : selectedConversation ? (
        <MessageContainer />
      ) : (
        <PlaceholderComponent />
      )} */}
    </div>
  );
};

export default Home;
