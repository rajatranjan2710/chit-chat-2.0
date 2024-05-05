import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { setMyProfile } from "../redux/reducers/authReducer";

// custom hook for fetching and adding profile to redux
const useMe = () => {
  const [meLoading, setMeLoading] = useState(false);
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
      setMeLoading(true);
      try {
        const response = await axios.get(`${server}/me`, {
          headers: {
            Authorization: `bearer ${jwtToken}`,
          },
        });
        const data = response.data.user;

        dispatch(setMyProfile(data));

        if (data.error) {
          throw new Error(data.error);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setMeLoading(false);
      }
    };

    me();
  }, [jwtToken, dispatch]);

  return { meLoading };
};

export default useMe;
