import { createAction, createReducer } from "@reduxjs/toolkit";

export const updateConversation = createAction("UPDATE_CONVERSATION");
export const updateNotification = createAction("UPDATE_CONVO_ON_NOTI");

export const updatedMessages = createAction("UPDATE_MESSAGES");
export const updatedMessageOnSend = createAction("UPDATE_MESSAGE_ONSEND");

const initialState = {
  conversations: [],
  messages: [],
  isNotification: false,
};

export const conversationsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateConversation, (state, action) => {
      state.conversations = action.payload.filteredusers;
      console.log("here is state of conversations : ", state.conversations);
    })

    //updating conversation array when there is notification
    .addCase(updateNotification, (state) => {
      state.isNotification = !state.isNotification;
    })

    //updating the selected conversation

    // updating message array
    .addCase(updatedMessages, (state, action) => {
      state.messages = action.payload;
    })

    //updating message array whenever we send a message
    .addCase(updatedMessageOnSend, (state, action) => {
      state.messages = [...state.messages, action.payload];
    });

  // deleted selected conversation on logout
});
