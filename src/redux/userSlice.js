import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const endpoint = "https://recruitment.ultimate.systems/auth/local";

export const signUp = createAsyncThunk("signUp", async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(
      `${endpoint}/register`,
      { username, email, password },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", data.jwt);
    return data;
  } catch (error) {
    if (error.response.status === 400) alert("User already exists");
    console.log(error);
  }
});

export const signIn = createAsyncThunk("signIn", async ({ identifier, password }) => {
  try {
    const { data } = await axios.post(
      endpoint,
      { identifier, password },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", data.jwt);
    const { user } = data;
    return user;
  } catch (error) {
    if (error.response.status === 400) alert("Identifier or password are incorrect, try again");
    console.log(error);
  }
});

export const slice = createSlice({
  name: "user",
  initialState: { user: null, authenticated: false },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.authenticated = false;
      localStorage.removeItem("token");
    },
    setUser: (state) => {
      state.authenticated = true;
    },
  },
  extraReducers: {
    [signUp.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.authenticated = true;
    },
    [signUp.rejected]: (state) => {
      state.user = null;
      state.authenticated = false;
    },
    [signIn.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.authenticated = true;
    },
    [signIn.rejected]: (state) => {
      state.user = null;
      state.authenticated = false;
    },
  },
});

export const { logout, setUser } = slice.actions;

export default slice.reducer;
