import { createAction, createReducer } from "@reduxjs/toolkit";

export const addUser = createAction("ADD_USER");
export const deleteUser = createAction("DELETE_USER");
export const setLoggedIn = createAction("IS_LOGGED_IN");
export const setMyProfile = createAction("SET_MY_PROFILE");
export const setFriends = createAction("SET_FRIENDS");

export const updatedSelecctedConversation = createAction(
  "UPDATED_SELECTED_CONVERSATION"
);
export const deleteSelecctedConversation = createAction(
  "DELETE_SELECTED_CONVERSATION"
);

const initialState = {
  me: {},
  user: null,
  userJSON: {},
  isLoggedIn: false,
  friends: [],
  selectedConversation: null,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addUser, (state, action) => {
      state.user = action.payload;
      // console.log("New value of user is ", state.user);
    })
    .addCase(deleteUser, (state) => {
      state.user = null;
    })

    .addCase(setLoggedIn, (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    })

    .addCase(setMyProfile, (state, action) => {
      state.me = action.payload;
    })

    .addCase(setFriends, (state, action) => {
      state.friends = action.payload;
      console.log("setting friends");
    })

    .addCase(updatedSelecctedConversation, (state, action) => {
      const id = action.payload;
      const filteredSelctedConversation = state.friends.find(
        (item) => item._id === id
      );
      state.selectedConversation = { ...filteredSelctedConversation };
      console.log(
        "state of selected conversation : ",
        state.selectedConversation
      );
    })

    .addCase(deleteSelecctedConversation, (state) => {
      state.selectedConversation = null;
    });
});
