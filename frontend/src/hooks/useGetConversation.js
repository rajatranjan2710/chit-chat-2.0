import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { updatedMessages } from "../redux/reducers/conversationsReducer";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  //getting cookie
  const jwtCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwt="));

  if (jwtCookie) {
    var jwtToken = jwtCookie.split("=")[1];
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      // console.log("scroll to bottom");
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const getChatConversation = async () => {
      setLoading(true);
      try {
        if (!selectedConversation) {
          return;
        }

        const response = await axios.get(
          `${server}/getchat/${selectedConversation._id}`,
          {
            headers: {
              Authorization: `bearer ${jwtToken}`,
            },
          }
        );
        const data = response.data.conversations[0]?.messages || [];

        if (data.error) {
          throw new Error(data.error);
        }

        dispatch(updatedMessages(data));

        setTimeout(() => {
          console.log("Scrolling to bottom");
          scrollToBottom();
        }, 100);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getChatConversation();

    return () => {};
  }, [selectedConversation, jwtToken, dispatch, messagesEndRef]);

  useEffect(() => {
    if (!loading) {
      console.log("not loading scrolling");
      scrollToBottom();
    }
  }, [loading]);

  return { loading, messagesEndRef, scrollToBottom };
};

export default useGetConversations;
