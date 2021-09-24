import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const endpoint = "https://recruitment.ultimate.systems/to-do-lists";

export const fetchLists = createAsyncThunk("fetchLists", async () => {
  try {
    const { data } = await axios(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const addList = createAsyncThunk("addList", async ({ name, task }) => {
  try {
    const { data } = await axios.post(
      endpoint,
      { name, task },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return { data };
  } catch (error) {
    console.log(error);
  }
});

export const deleteList = createAsyncThunk("deleteList", async (id) => {
  try {
    await axios.delete(`${endpoint}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return id;
  } catch (error) {
    console.log(error);
  }
});

export const updateList = createAsyncThunk("updateList", async ({ id, name, task }) => {
  try {
    const { data } = await axios(`${endpoint}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const updList = { ...data, name, task };

    const { data: updData } = await axios.put(`${endpoint}/${id}`, updList, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return updData;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  lists: [],
  isOldestFirst: true,
};

export const slice = createSlice({
  name: "list",
  initialState,
  reducers: {
    searchLists: (state, action) => {
      state.lists = state.lists.filter((list) => list.name.toLowerCase().includes(action.payload.toLowerCase()));
    },
    clearSearch: (state) => {
      state.lists = initialState.lists;
    },
    toggleSortByDate: (state) => {
      state.isOldestFirst = !state.isOldestFirst;
      if (state.isOldestFirst) {
        state.lists = state.lists.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else {
        state.lists = state.lists.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      }
    },
  },
  extraReducers: {
    [fetchLists.fulfilled]: (state, action) => {
      state.lists = action.payload;
    },
    [fetchLists.rejected]: (state) => {
      state.lists = [];
    },
    [addList.fulfilled]: (state, action) => {
      state.lists.push(action.payload.data);
    },
    [addList.rejected]: (state) => {
      state.lists = [];
    },
    [deleteList.fulfilled]: (state, action) => {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
    },
    [deleteList.rejected]: (state) => {
      state.lists = [];
    },
    [updateList.fulfilled]: (state, action) => {
      state.lists = state.lists.map((list) =>
        list.id === action.payload.id ? { ...list, name: action.payload.name, task: action.payload.task } : list
      );
    },
    [updateList.rejected]: (state) => {
      state.lists = [];
    },
  },
});

export const { searchLists, toggleSortByDate, clearSearch } = slice.actions;

export default slice.reducer;
