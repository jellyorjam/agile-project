import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginSlice"

export const store = configureStore({
  reducer: {
    login: loginReducer,
  }
})