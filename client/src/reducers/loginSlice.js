import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import {url} from "../config/keys"

// const baseUrl = 'http://localhost:8000';
const baseUrl = url;

const initialState = [];

export const setMember = createAsyncThunk('login/setMember', async (hardCodedUserId) => {
  try {
    const response = await axios.get('http://localhost:8000/members/' + hardCodedUserId);
    return response.data
  }
  catch (err) {
    return err
  }
})

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(setMember.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const {reset} = loginSlice.actions
export default loginSlice.reducer