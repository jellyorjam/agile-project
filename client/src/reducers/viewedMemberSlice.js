import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

const initialState = {
  member: [],
  workspaces: []
};

export const setViewedMemberWorkspace = createAsyncThunk('profile/setViewedMemberWorkspace', async (workspace) => {
  try {
    const response = await axios.get(baseUrl + '/workspaces/' + workspace);
    return response.data
  }
  catch (err) {
    return err
  }
});

export const findMember = createAsyncThunk('profile/findMember', async (member) => {
  try {
    const response = await axios.get(baseUrl + '/members/' + member);
    return response.data
  }
  catch (err) {
    return err
  }
});

export const viewedMemberSlice = createSlice({
  name: 'viewedMember',
  initialState,
  reducers: {
    memberLoaded: (state) => {
      state.memberLoaded = true;
    },
    memberWSLoaded: (state) => {
      state.memberWSLoaded = true;
    },
    clearViewedMember: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(findMember.fulfilled, (state, action) => {
      debugger;
      state.member.push(action.payload);
    })
    builder.addCase(setViewedMemberWorkspace.fulfilled, (state, action) => {
      debugger;
      state.member[0].workspaces.forEach(ws => {
        if(ws === action.payload._id){
          state.workspaces.push(action.payload)
        }
      })
    })
  }
})

export const { memberLoaded, memberWSLoaded, clearViewedMember } = viewedMemberSlice.actions;
export default viewedMemberSlice.reducer