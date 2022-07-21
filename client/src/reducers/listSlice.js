import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

const initialState = {
  lists: []
};

export const getLists = createAsyncThunk('list/getLists', async (list) => {
  try {
    const response = await axios.get(baseUrl + '/lists/' + list);
    return response.data
  }
  catch (err) {
    return err
  }
})

// export const getMembersOfBoard = createAsyncThunk('board/getMembersOfBoard', async (member) => {
//   try {
//     const response = await axios.get(baseUrl + '/members/' + member);
//     return {
//       name: response.data.name,
//       _id: response.data._id
//     }

//   }
//   catch (err) {
//     return err
//   }
// })

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getLists.fulfilled, (state, action) => {
      state.lists.push(action.payload)
    });
  }
  //   builder.addCase(getMembersOfBoard.fulfilled, (state, action) => {
  //     state.members.push(action.payload)
  //   })
  // }
})

export const {} = listSlice.actions;
export default listSlice.reducer