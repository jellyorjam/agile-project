import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginSlice";
import homeReducer from "./reducers/homeSlice"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    home: homeReducer
  }
})