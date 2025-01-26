import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  LoanReq: [],
  loading: false,
  error: "",
};

const LoanReqSlice = createSlice({
  name: "loanReq",
  initialState,
  reducers: {
    getLoanReqStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    getLoanReqSuccess: (state, action) => {
      state.loading = false;
      state.LoanReq = action.payload;
    },
    getLoanReqFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateLoanReqSuccess: (state, action) => {
      const index = state.LoanReq.findIndex(loan => loan._id === action.payload._id);
      if (index !== -1) {
        state.LoanReq[index] = action.payload;
      }
    },
  },
});

const actions = LoanReqSlice.actions;

export const {
  getLoanReqStart,
  getLoanReqSuccess,
  getLoanReqFailure,
  updateLoanReqSuccess
} = actions;

export default LoanReqSlice.reducer;