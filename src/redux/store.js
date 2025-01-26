import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Slices/userSlice.jsx";
import loanReqReducer from "./Slices/loanReqSlice.jsx";
const store = configureStore(
  {
    reducer: {
      user: userReducer,
      loanReq: loanReqReducer,
    },
  },
  +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;