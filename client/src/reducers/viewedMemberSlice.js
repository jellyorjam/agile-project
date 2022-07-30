import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const viewedMemberSlice = createSlice({
  name: 'viewedMember',
  initialState,
  reducers: {
    setMember: (state, action) => {
      const data = {
        member: action.payload[0].member,
        workspaces: action.payload[0].workspaces
      };

      state.push(data);
    },
    clearViewedMember: () => initialState,
  }
})

export const { memberLoaded, clearViewedMember, setMember } = viewedMemberSlice.actions;
export default viewedMemberSlice.reducer