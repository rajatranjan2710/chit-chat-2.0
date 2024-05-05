import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { utilReducer } from "./reducers/utilReducer";
import { conversationsReducer } from "./reducers/conversationsReducer";
import { socketReducer } from "./reducers/socketReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    util: utilReducer,
    conversations: conversationsReducer,
    socket: socketReducer,
  },
});

export default store;

export const server = `https://chit-chat-2-0-1.onrender.com/api/v1`;
