import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

const initialState = [];

export const setMember = createAsyncThunk('login/setMember', async (hardCodedUserId) => {
  try {
    const response = await axios.get(baseUrl + '/members/' + hardCodedUserId);
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
    
  },
  extraReducers: (builder) => {
    builder.addCase(setMember.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export default loginSlice.reducer