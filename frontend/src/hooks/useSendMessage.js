import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { updatedMessageOnSend } from "../redux/reducers/conversationsReducer";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const sendMessage = async (message) => {
    if (!message) {
      return;
    }

    // console.log("In useSendMessage ", message);
    setLoading(true);
    try {
      //getting token

      const jwtCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwt="));

      if (jwtCookie) {
        var jwtToken = jwtCookie.split("=")[1];
      }

      if (!selectedConversation._id) {
        return;
      }

      const response = await axios.post(
        `${server}/sendmessage/${selectedConversation._id}`,
        message,
        {
          withCredentials: true,
          headers: {
            Authorization: `bearer ${jwtToken}`,
          },
        }
      );

      const data = response.data;
      if (data.error) {
        throw new Error(data.error);
      }
      const messageSent = data.newMessage;
      dispatch(updatedMessageOnSend(messageSent));

      // console.log("response", messageSent);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
