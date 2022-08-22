import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    filter: {
      name_like: "",
      _sort: "",
      _order: "asc",
    },
  },
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const updatedFilter = (state) => state?.user?.filter;

export const { updateFilter } = UserSlice.actions;

export default UserSlice.reducer;
