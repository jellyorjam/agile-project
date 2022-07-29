import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import {url} from "../config/keys"

// const baseUrl = 'http://localhost:8000';
const baseUrl = url;

const initialState = {
};

// export const editCardTitle = createAsyncThunk('card/editTitle', async (list) => {
//   try {
//     const response = await axios.put(baseUrl + "/lists/" + list.list._id, list.list)
//     return response.data;
//   }
//   catch (err) {
//     return err;
//   }
// })


export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCardDetail: (state, action) => {
      state.members = action.payload.members;
      state.labels = action.payload.labels;
      state.activity = action.payload.activity;
    }
  },
})

export const {setCardDetail} = cardSlice.actions
export default cardSlice.reducer