import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import rootURL from "../../api/reddit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (subreddit = "Home", { rejectWithValue }) => {
    try {
      // const response = await fetch(`${subreddit}.json`);
      const response = await fetch(`${rootURL}/r/${subreddit}.json`);

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      return data.data.children.map((post) => post.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoadingPosts: false,
    hasPostError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoadingPosts = true;
        state.hasPostError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoadingPosts = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoadingPosts = false;
        state.hasPostError = true;
      });
  },
});

export const selectPosts = (state) => state.posts.posts;
export const selectPost = (postId) => (state) =>
  state.posts.posts.find((post) => post.id === postId);
export const selectIsLoadingPosts = (state) => state.posts.isLoadingPosts;
export const selectHasPostError = (state) => state.posts.hasPostError;

export default postsSlice.reducer;
