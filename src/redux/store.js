import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/UserSlice";
import alertReducer from "./alerts/AlertSlice";

const reducer = combineReducers({
  user: userReducer,
  alert: alertReducer,
});

export const store = configureStore({
  reducer,
});
