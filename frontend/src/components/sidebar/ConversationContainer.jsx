import React from "react";
import Conversations from "./Conversations";
import { useSelector } from "react-redux";
import Loader from "../Loader";

import useFetchFriends from "../../hooks/useFetchFriends";

const ConversationContainer = ({ onConversationClick, isMobileView }) => {
  const { friendsLoading } = useFetchFriends();

  const { friends } = useSelector((state) => state.auth);
  // useListenMessage();
  console.log("conversation : ", friends);

  return (
    <div className="conversation_container">
      {friendsLoading ? (
        <Loader />
      ) : (
        friends.map((item, index) => (
          <Conversations
            item={item}
            key={index}
            onConversationClick={onConversationClick}
            isMobileView={isMobileView}
          />
        ))
      )}
    </div>
  );
};

export default ConversationContainer;
