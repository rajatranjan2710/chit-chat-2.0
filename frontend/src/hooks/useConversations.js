import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../redux/store";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateConversation } from "../redux/reducers/conversationsReducer";

const useConversations = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const jwtCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwt="));

  if (jwtCookie) {
    // Extracting the JWT token value
    var jwtToken = jwtCookie.split("=")[1];
  }

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${server}/getusers`, {
          headers: {
            Authorization: `bearer ${jwtToken}`,
          },
        });
        const data = response.data;

        //updating conversations in redux
        dispatch(updateConversation(data));

        // if there is error throwing error
        if (data.error) {
          throw new Error(data.error);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [jwtToken, dispatch]);

  return { loading };
};

export default useConversations;
