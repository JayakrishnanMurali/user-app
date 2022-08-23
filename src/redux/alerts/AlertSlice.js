import { createSlice } from "@reduxjs/toolkit";

export const AlertSlice = createSlice({
  name: "alert",
  initialState: {
    status: {
      status: false,
      msg: "Success!",
    },
  },
  reducers: {
    updateStatus: (state, action) => {
      state.status.status = action.payload.status;
      state.status.msg = action.payload.msg;
    },
  },
});

export const updatedStatus = (state) => state?.alert?.status;

export const { updateStatus } = AlertSlice.actions;

export default AlertSlice.reducer;
