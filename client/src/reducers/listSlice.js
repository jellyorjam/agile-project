import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

const initialState = {
  lists: [],
  cards: []
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

export const getCards = createAsyncThunk('list/getCards', async (card) => {
  try {
    const response = await axios.get(baseUrl + '/cards/' + card);
    return {
      _id: response.data._id,
      title: response.data.title,
      members: response.data.members,
      labels: response.data.labels
    }
  }
  catch (err) {
    return err
  }
})

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
   listsLoaded: (state) => {
     state.listsLoaded = true
   },
   clearListsAndCards: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getLists.fulfilled, (state, action) => {
        state.lists.push(action.payload)
    });
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.cards.push(action.payload)
    })
  }
})

export const {listsLoaded, clearListsAndCards} = listSlice.actions;
export default listSlice.reducer