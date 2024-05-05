import React from "react";
import { useDispatch, useSelector } from "react-redux";
import chat3d from "../assets/chat3d.png";
import toast from "react-hot-toast";
import { updatedSelecctedConversation } from "../redux/reducers/authReducer";

const PlaceholderComponent = () => {
  const { isProfileOpen } = useSelector((state) => state.util);

  const { friends } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const placeholderClick = () => {
    dispatch(updatedSelecctedConversation(friends[0]._id));
  };

  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        width: isProfileOpen ? "45%" : "70%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0 20px 20px 0px",
      }}
    >
      <div style={{ width: "15rem", height: "15rem" }}>
        <img
          src={chat3d}
          alt="placeholder"
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "1rem",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: "bold" }}>Click on </div>
        <button
          onClick={placeholderClick}
          style={{
            fontSize: 16,
            width: "5rem",
            padding: "0.6rem",
            backgroundColor: "#007fff",
            color: "white",
            border: "none",
            borderRadius: "15px",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
          }}
        >
          Chat
        </button>
        <div style={{ fontSize: 18, fontWeight: "bold" }}>to start chat</div>
      </div>
    </div>
  );
};

export default PlaceholderComponent;
