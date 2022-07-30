import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginSlice";
import homeReducer from "./reducers/homeSlice";
import workspaceReducer from "./reducers/workspaceSlice";
import boardReducer from "./reducers/boardSlice";
import listReducer from "./reducers/listSlice";
import viewedMemberReducer from "./reducers/viewedMemberSlice";
import cardReducer from "./reducers/cardSlice"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    viewedMember: viewedMemberReducer,
    home: homeReducer,
    workspace: workspaceReducer,
    board: boardReducer,
    list: listReducer,
    card: cardReducer
  }
})