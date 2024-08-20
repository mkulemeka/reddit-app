import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import rootURL from "../../api/reddit";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (permalink, { rejectWithValue }) => {
    try {
      const response = await fetch(`${rootURL}${permalink}.json`);
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = await response.json();
      const comments = data[1].data.children.map((comment) => comment.data);
      return comments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    isLoadingComments: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoadingComments = true;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        state.comments = payload;
        state.isLoadingComments = false;
        state.hasError = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isLoadingComments = false;
        state.hasError = true;
      });
  },
});

export const selectComments = (state) => state.comments.comments;
export const selectIsLoadingComments = (state) => state.comments.isLoadingComments;
export const selectHasError = (state) => state.comments.hasError;
export default commentsSlice.reducer;
