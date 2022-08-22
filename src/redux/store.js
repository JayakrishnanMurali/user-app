import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/UserSlice";

const reducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer,
});
