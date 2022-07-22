import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

const initialState = {
  members: []
};

export const getBoard = createAsyncThunk('board/getBoard', async (boardId) => {
  try {
    const response = await axios.get(baseUrl + '/boards/' + boardId);
    return response.data
  }
  catch (err) {
    return err
  }
})

export const getMembersOfBoard = createAsyncThunk('board/getMembersOfBoard', async (member) => {
  try {
    const response = await axios.get(baseUrl + '/members/' + member);
    return {
      name: response.data.name,
      _id: response.data._id
    }
  }
  catch (err) {
    return err
  }
})

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
   clearMembers: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getBoard.fulfilled, (state, action) => {
      state.boardInfo = action.payload
    });
    builder.addCase(getMembersOfBoard.fulfilled, (state, action) => {
      state.members.push(action.payload)
    })
  }
})

export const {clearMembers, clearBoard} = boardSlice.actions

export default boardSlice.reducer