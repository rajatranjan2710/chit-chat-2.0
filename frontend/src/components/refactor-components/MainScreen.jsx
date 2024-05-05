import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import MessageContainer from "../message-container/MessageContainer";
import PlaceholderComponent from "../PlaceholderComponent";
import { setIsPhoneView } from "../../redux/reducers/utilReducer";
import ProfileShow from "../message-container/ProfileShow";

const MainScreen = () => {
  const { selectedConversation } = useSelector((state) => state.auth);

  const [isMobileView, setIsMobileView] = useState(false);
  const [showMessageConatiner, setShowMessageContainer] = useState(false);
  const { isProfileOpen } = useSelector((state) => state.util);
  //   console.log("Selected conversation : ", selectedConversation);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Adjust the breakpoint as needed
      // getIsMobileView(isMobileView);
      // if (window.innerWidth <= 768) {
      //   const payload = window.innerWidth;
      //   dispatch(setIsPhoneView(payload));
      // }
    };

    handleResize(); // Check initial width
    dispatch(setIsPhoneView(isMobileView));
    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener
    };
  }, []);

  const handleConversationClick = () => {
    if (isMobileView) {
      setShowMessageContainer(true);
    }
  };

  const handleBackToSidebar = () => {
    setShowMessageContainer(false);
  };

  return (
    <div className="main-Screen">
      {isProfileOpen && isMobileView ? (
        <ProfileShow isMobileView={isMobileView} />
      ) : (
        isMobileView &&
        !showMessageConatiner && (
          <Sidebar
            onConversationClick={handleConversationClick}
            isMobileView={isMobileView}
          />
        )
      )}
      {/* //Passing isMobileView prop in message container */}
      {showMessageConatiner && isMobileView && (
        <MessageContainer
          onBackToSidebar={handleBackToSidebar}
          isMobileView={isMobileView}
        />
      )}

      {!isMobileView && (
        <>
          <Sidebar />
          {selectedConversation ? (
            <MessageContainer />
          ) : (
            <PlaceholderComponent />
          )}
        </>
      )}
      {!isMobileView && isProfileOpen && (
        <>
          <ProfileShow />
        </>
      )}
    </div>
  );
};

export default MainScreen;
