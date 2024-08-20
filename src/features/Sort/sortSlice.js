import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    sort: "asc",
  },
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setSort } = sortSlice.actions;
export const selectSort = (state) => state.sort.sort;
export default sortSlice.reducer;
