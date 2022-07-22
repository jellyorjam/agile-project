import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  boards: [],
  members: []
};
const baseUrl = 'http://localhost:8000';

export const loadBoardsInWorkspace = createAsyncThunk('workspace/loadBoardsInWorkspace', async (board) => {
  try {
    const response = await axios.get(baseUrl + '/boards/' + board);
    return {
      title: response.data.title,
      _id: response.data._id}
  }
  catch (err) {
    return err
  }
})

export const getMembersOfWorkspace = createAsyncThunk('workspace/getMembers', async (member) => {
  try {
    const response = await axios.get(baseUrl + '/members/' + member);
    return {
      name: response.data.name,
      _id: response.data._id}
  }
  catch (err) {
    return err
  }
})

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    boardsLoaded: (state) => {
      state.boardsLoaded = true;
    },
    clearBoards: () => initialState,
    clearMembers: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(loadBoardsInWorkspace.fulfilled, (state, action) => {
      state.boards.push(action.payload)
    });
    builder.addCase(getMembersOfWorkspace.fulfilled, (state, action) => {
      state.members.push(action.payload)
    })
  }
})

export const {boardsLoaded, clearBoards, clearMembers} = workspaceSlice.actions;
export default workspaceSlice.reducer