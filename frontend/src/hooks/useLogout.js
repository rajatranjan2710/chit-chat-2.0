import axios from "axios";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteUser } from "../redux/reducers/authReducer";
import { useState } from "react";
import { deleteSelecctedConversation } from "../redux/reducers/authReducer";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const logout = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${server}/logout`);
      toast.success(response.data.message);

      localStorage.removeItem("user");
      dispatch(deleteUser());
      dispatch(deleteSelecctedConversation());
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
