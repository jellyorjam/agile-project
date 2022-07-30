import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import {url} from "../config/keys"

const initialState = {
  userId: [],
  error: []
};

export const setLogin = createAsyncThunk('login/setLogin', async (userData) => {
  try {
    const response = await axios.post('/login', userData);
    return response.data;
  } catch (err) {
    if (err.response.data === "User not found"){
      return err
    }
  }
})

export const setMember = createAsyncThunk('login/setMember', async (userId) => {
  try {
    const response = await axios.get(url + '/members/' + userId);
    return response.data
  }
  catch (err) {
    return err
  }
});

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
    builder.addCase(setLogin.fulfilled, (state, action) => {
      if(action.payload.message){
        state.error.push(action.payload)
      }
      if(action.payload._id){
        state.userId.push(action.payload);
      }
    })
  }
})

export const {reset} = loginSlice.actions
export default loginSlice.reducer