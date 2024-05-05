import axios from "axios";
import { useState } from "react";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { addUser, setLoggedIn } from "../redux/reducers/authReducer";
import { useDispatch } from "react-redux";
import { setProfileDefault } from "../redux/reducers/utilReducer";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const login = async (formData) => {
    setLoading(true);
    try {
      const success = validateData(formData);
      if (!success) {
        return;
      }

      const response = await axios.post(`${server}/login`, formData, {
        withCredentials: true,
      });

      const data = response.data.user;
      console.log(response.data);
      toast.success(data.message);

      localStorage.setItem("user", JSON.stringify(data));
      dispatch(addUser(JSON.stringify(data)));
      dispatch(setProfileDefault());
      dispatch(setLoggedIn());
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

const validateData = (formData) => {
  if (!formData.userName || !formData.password) {
    toast.error("All fields are required");
    return false;
  } else {
    return true;
  }
};
