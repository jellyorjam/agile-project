import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

const initialState = {};

export const getBoard = createAsyncThunk('board/getBoard', async (boardId) => {
  try {
    const response = await axios.get(baseUrl + '/boards/' + boardId);
    return response.data
  }
  catch (err) {
    return err
  }
})

export const getWorkspaceBoard = createAsyncThunk('board/getWorkspaceBoard', async (boardId) => {
  try {
    const response = await axios.get(baseUrl + '/boards/' + boardId);
    return response.data
  }
  catch (err) {
    return err
  }
})


export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getBoard.fulfilled, (state, action) => {
      state.boardInfo = action.payload
    })
    builder.addCase(getWorkspaceBoard.fulfilled, (state, action) => {
      state.workpace.boards.push(action.payload)
    })
  }
})

export default boardSlice.reducer