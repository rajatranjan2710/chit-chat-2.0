import { createAction, createReducer } from "@reduxjs/toolkit";

export const setProfileOpen = createAction("SET_PROFILE_OPEN");
export const setProfileDefault = createAction("SET_PROFILE_DEFAULT");
export const setIsPhoneView = createAction("SET_PHONE_VIEW");

const initialState = {
  isProfileOpen: false,
  isPhoneView: null,
};

export const utilReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setProfileOpen, (state) => {
      state.isProfileOpen = !state.isProfileOpen;
      // console.log(state.isProfileOpen);
    })
    .addCase(setProfileDefault, (state) => {
      state.isProfileOpen = false;
    })

    //setting ifPhone view
    .addCase(setIsPhoneView, (state, action) => {
      state.isPhoneView = action.payload;
      console.log("state of phone view : ", state.isPhoneView);
    });
});
