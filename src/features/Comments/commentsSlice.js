import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    isCommentLoading: false,
    hasError: false,
  },
  reducers: {},
});

export default commentsSlice.reducer;
