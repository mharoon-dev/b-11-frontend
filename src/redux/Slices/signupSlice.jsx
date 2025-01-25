import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: "",
};

const signupSlice = createSlice({
  name: "signupUser",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
  },
});

const actions = signupSlice.actions;

export const {
  signupStart,
  signupSuccess,
  signupFailure,
} = actions;

export default signupSlice.reducer;