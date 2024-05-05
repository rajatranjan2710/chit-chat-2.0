import { createAction, createReducer } from "@reduxjs/toolkit";

export const setSocketData = createAction("socket/setSocket");
export const setOnlineUsers = createAction("socket/setOnlineUsers");
export const clearSocket = createAction("socket/clearSocket");
export const isHomeMounted = createAction("socket/isHomeMounted");

const initialState = {
  onlineUsers: [],
  socketData: null,
  notificationMessage: [],
  isHomeMounted: false,
};

export const socketReducer = createReducer(initialState, (builder) => {
  // adding socket to state
  builder
    .addCase(setSocketData, (state, action) => {
      state.socketData = action.payload;
    })

    .addCase(clearSocket, (state) => {
      state.socket = null;
      state.onlineUsers = [];
    })

    //setting online users
    .addCase(setOnlineUsers, (state, action) => {
      state.onlineUsers = action.payload;
    })

    .addCase(isHomeMounted, (state) => {
      state.isHomeMounted = !state.isHomeMounted;
    });
});
