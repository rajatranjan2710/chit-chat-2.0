import React from "react";
import "../../styles/messageContainer.scss";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { deleteSelecctedConversation } from "../../redux/reducers/authReducer";

const ContainerHeader = ({ isMobileView, onBackToSidebar }) => {
  const { isProfileOpen } = useSelector((state) => state.util);
  const { selectedConversation } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const backToSideBar = () => {
    onBackToSidebar();
    dispatch(deleteSelecctedConversation());
  };

  return (
    <div
      className="container-header"
      style={{
        borderRadius: isProfileOpen || isMobileView ? 0 : "0px 20px 0 0",
      }}
    >
      {isMobileView && (
        <div onClick={backToSideBar}>
          <IoIosArrowBack />
        </div>
      )}
      <div className="avatar">
        <img src={selectedConversation?.profilepic.secure_url || ""} alt="" />
      </div>
      <div
        style={{
          textTransform: "capitalize",
          color: "white",
        }}
      >
        {selectedConversation?.fullName || ""}{" "}
      </div>
    </div>
  );
};

export default ContainerHeader;
