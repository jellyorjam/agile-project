import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import {url} from "../config/keys"

// const baseUrl = 'http://localhost:8000';
const baseUrl = url;

const initialState = {
};


export const addCommentToCard = createAsyncThunk('card/addCommentToCard', async (data) => {
  try {
     const response = await axios.post(baseUrl + "/boards/" + data.boardId + "/cards/" + data.cardId + "/activity", data.activity)
    return JSON.parse(response.config.data)
  }
  catch (err) {
    return err
  }
})

export const editToComment = createAsyncThunk('card/editToComment', async (comment) => {
  try {
    const response = await axios.put(baseUrl + "/activities/" + comment._id, comment);
    console.log(JSON.parse(response.config.data))
    return JSON.parse(response.config.data)
  }
  catch (err) {
    return err
  }
})

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCardDetail: (state, action) => {
      state.members = action.payload.members;
      state.labels = action.payload.labels;
      state.activity = action.payload.activity;
    },
    cardAdded: (state, action) => {
      state.cardAdded = action.payload
    },
    activityAdded: (state, action) => {
      state.activityAdded = action.payload
    },
    detailsLoaded: (state, action) => {
      state.detailsLoaded = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addCommentToCard.fulfilled, (state, action) => {
      state.activity.push({...action.payload, member: action.meta.arg.member})
    });
    builder.addCase(editToComment.fulfilled, (state, action) => {
      state.activity[action.meta.arg.index] = action.payload
    })
  }
})

export const {setCardDetail, cardAdded, activityAdded, detailsLoaded} = cardSlice.actions
export default cardSlice.reducer