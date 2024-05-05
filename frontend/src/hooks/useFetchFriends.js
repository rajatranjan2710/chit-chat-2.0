import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { setFriends, setMyProfile } from "../redux/reducers/authReducer";

// custom hook for fetching and adding profile to redux
const useFetchFriends = () => {
  const [friendsLoading, setFriendsLoading] = useState(false);
  const dispatch = useDispatch();

  const jwtCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwt="));

  if (jwtCookie) {
    // Extracting the JWT token value
    var jwtToken = jwtCookie.split("=")[1];
  }

  useEffect(() => {
    const me = async () => {
      setFriendsLoading(true);
      try {
        const response = await axios.get(`${server}/getusers`, {
          headers: {
            Authorization: `bearer ${jwtToken}`,
          },
        });
        const data = response.data.filteredusers;
        console.log("data of users", data);
        dispatch(setFriends(data));

        if (data.error) {
          throw new Error(data.error);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setFriendsLoading(false);
      }
    };

    me();
  }, [jwtToken, dispatch]);

  return { friendsLoading };
};

export default useFetchFriends;
