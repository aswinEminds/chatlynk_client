import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../reducers/chatReducers";

export default configureStore({
  reducer: {
    chat: chatReducer,
  },
});
