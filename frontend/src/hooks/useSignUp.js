import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { server } from "../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Compressor from "compressorjs";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signUplol = async (formData) => {
    const success = ValidDate(formData);
    console.log(success);
    if (!success) {
      return;
    }

    // Compress profile picture before uploading

    setLoading(true);
    try {
      // const compressedFile = await compressImage(formData.avatarPreview);

      //creating a new formdata
      const formDataWithFile = new FormData();

      formDataWithFile.append("fullName", formData.fullName);
      formDataWithFile.append("userName", formData.userName);
      formDataWithFile.append("password", formData.password);
      formDataWithFile.append("confirmPassword", formData.confirmPassword);
      formDataWithFile.append("gender", formData.gender);
      formDataWithFile.append("avatar", formData.avatar);
      formDataWithFile.append("avatarPreview", formData.avatarPreview);

      const response = await axios.post(`${server}/signup`, formDataWithFile, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // Set correct Content-Type,
        },
      });

      console.log(response.data);
      toast.success(response.data.message);

      navigate("/home");
    } catch (error) {
      console.log(error);
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6, // Adjust quality as needed
        success(result) {
          resolve(result);
        },
        error(error) {
          reject(error);
        },
      });
    });
  };

  return { loading, signUplol };
};

export default useSignUp;

const ValidDate = (formData) => {
  if (
    !formData.userName ||
    !formData.fullName ||
    !formData.password ||
    !formData.confirmPassword ||
    !formData.gender
  ) {
    toast.error("All fields are required");
    return false;
  } else if (formData.password !== formData.confirmPassword) {
    toast.error("Password Doesn't Match");
    return false;
  } else if (formData.password.length < 6) {
    toast.error("Password must have atleast 6 characters");
    return false;
  } else {
    return true;
  }
};
