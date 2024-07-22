import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      return {
        ...state,
        userDetails: action.payload,
      };
    },
  },
});

export const { setUserDetails } = commonSlice.actions;

export default commonSlice.reducer;
