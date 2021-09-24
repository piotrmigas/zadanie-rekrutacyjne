import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./listSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: { list: listReducer, user: userReducer },
});
