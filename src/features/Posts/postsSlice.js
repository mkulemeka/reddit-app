import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  filterPosts as filter,
  searchPosts as search,
  sortPosts as sort,
} from "../../utils";

import rootURL from "../../api/reddit";
import { selectSearchTerm } from "../Search/searchSlice";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (subreddit, { rejectWithValue }) => {
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
    filteredPosts: [],
    isLoadingPosts: false,
    hasPostError: false,
  },
  reducers: {
    sortPosts: (state, action) => {
      state.filteredPosts = sort(state.posts, action.payload);
    },
    filterPosts: (state, action) => {
      state.filteredPosts = filter(state.posts, action.payload);
    },
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
        state.filteredPosts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoadingPosts = false;
        state.hasPostError = true;
      });
  },
});

export const { sortPosts, filterPosts, searchPosts } = postsSlice.actions;
export const selectPosts = (state) => {
  const searchTerm = selectSearchTerm(state);
  const filteredPosts = state.posts.filteredPosts;

  if (searchTerm) return search(filteredPosts, searchTerm);
  return filteredPosts;
}
export const selectPost = (postId) => (state) =>
  state.posts.posts.find((post) => post.id === postId);
export const selectIsLoadingPosts = (state) => state.posts.isLoadingPosts;
export const selectHasPostError = (state) => state.posts.hasPostError;

export default postsSlice.reducer;
