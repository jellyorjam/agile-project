import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginSlice";
import homeReducer from "./reducers/homeSlice";
import workspaceReducer from "./reducers/workspaceSlice";
import boardReducer from "./reducers/boardSlice";
import listReducer from "./reducers/listSlice"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    home: homeReducer,
    workspace: workspaceReducer,
    board: boardReducer,
    list: listReducer,
  }
})