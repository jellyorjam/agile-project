import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

const initialState = {
  workspaces: [],
  viewedMember: {}
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

export const findMember = createAsyncThunk('profile/findMember', async (member) => {
  try {
    const response = await axios.get(baseUrl + '/members/' + member);
    return response.data
  }
  catch (err) {
    return err
  }
})

export const setViewedMemberWorkspace = createAsyncThunk('profile/setViewedMemberWorkspace', async (workspace) => {
  try {
    const response = await axios.get(baseUrl + '/workspaces/' + workspace);
    return response.data
  }
  catch (err) {
    return err
  }
});

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    workspacesLoaded: (state) => {
      state.workspacesLoaded = true;
    },
    memberLoaded: (state) => {
      state.memberLoaded = true;
    },
    memberWSLoaded: (state) => {
      state.memberWSLoaded = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setWorkspaces.fulfilled, (state, action) => {
      state.workspaces.push(action.payload);
    });
    builder.addCase(findMember.fulfilled, (state, action) => {
      state.viewedMember = action.payload;
    })
    builder.addCase(setViewedMemberWorkspace.fulfilled, (state, action) => {
      state.viewedMember.workspaces.push(action.payload)
    })
  }
})

export const {workspacesLoaded, memberLoaded, memberWSLoaded} = homeSlice.actions;
export default homeSlice.reducer