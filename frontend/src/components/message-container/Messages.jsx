import React, { useEffect } from "react";
import Message from "./Message";
import useGetConversations from "../../hooks/useGetConversation";
import { useSelector } from "react-redux";
import { Rings } from "react-loader-spinner";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
  const { loading, messagesEndRef, scrollToBottom } = useGetConversations();

  const { messages } = useSelector((state) => state.conversations);
  // useListenMessage();

  console.log("Messages component mounted");
  //To scroll when there is new message
  useEffect(() => {
    // console.log("running in useffect of messages");
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [messages]);

  return (
    <div className="messages">
      {loading ? (
        <Rings
          height={100}
          width={100}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          color="red"
        />
      ) : messages.length === 0 ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Messages empty
        </div>
      ) : (
        <>
          {messages.map((item, index) => (
            <div key={index}>
              <Message item={item} />
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </>
      )}
    </div>
  );
};

export default Messages;
