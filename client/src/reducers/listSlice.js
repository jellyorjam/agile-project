import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import {url} from "../config/keys"

// const baseUrl = 'http://localhost:8000';
const baseUrl = url;

const initialState = {};

export const addList = createAsyncThunk('list/addList', async (newList) => {
  try {
     const response = await axios.post(baseUrl + "/boards/" + newList.boardId + "/lists", {
      title: newList.title
    })
    return JSON.parse(response.config.data)
  }
  catch (err) {
    return err
  }
})

// export const addCard = createAsyncThunk('list/addCard', async (cardObj) => {
//   try {
//      const response = await axios.post(baseUrl + "/boards/" + cardObj.boardId + "/lists/" + cardObj.listId, {
//       title: newList.title
//     })
//     return JSON.parse(response.config.data)
//   }
//   catch (err) {
//     return err
//   }
// })

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
  setListsAndCards: (state, action) => {
    return action.payload
  },
  addCard: (state, action) => {
    const index = action.payload.index;
    state[index].cards[0].push({title: action.payload.title.title})
  },
   listsLoaded: (state) => {
     state.listsLoaded = true
   },
   clearListsAndCards: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(addList.fulfilled, (state, action) => {
      state.push({
        list: action.payload,
        cards: []
      })
  })
  }
})

export const {listsLoaded, clearListsAndCards, setListsAndCards, addCard} = listSlice.actions;
export default listSlice.reducer