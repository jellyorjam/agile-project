import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

const initialState = {
  workspaces: []
};

export const setWorkspaces = createAsyncThunk('home/setWorkspaces', async (workspace) => {
  try {
    const response = await axios.get(baseUrl + '/workspaces/' + workspace);
    return response.data
  }
  catch (err) {
    return err
  }
})

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(setWorkspaces.fulfilled, (state, action) => {
      state.workspaces.push(action.payload)
    })
  }
})

export default homeSlice.reducer