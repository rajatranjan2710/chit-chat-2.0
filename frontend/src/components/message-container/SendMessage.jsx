import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";
import { Rings } from "react-loader-spinner";
import { useSelector } from "react-redux";

const SendMessage = () => {
  const [message, setMessage] = useState({
    message: "",
  });
  const { loading, sendMessage } = useSendMessage();
  const { isProfileOpen } = useSelector((state) => state.util);

  // console.log(message);

  const handleChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
    // console.log(message);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (message.message === "") {
      return;
    }
    // console.log("we are in sendmessage onsubmit");
    sendMessage(message);
    setMessage({ message: "" });
  };

  return (
    <div className="sendMessage">
      <div className="form-container">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="type your message"
            name="message"
            value={message.message}
            onChange={handleChange}
          />
          {loading ? (
            <div>l</div>
          ) : (
            <button
              type="submit"
              style={{ right: isProfileOpen ? "40px" : "40px" }}
            >
              <IoSend size={26} />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SendMessage;
