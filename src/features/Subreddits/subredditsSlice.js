import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import rootURL from "../../api/reddit";

export const fetchSubreddits = createAsyncThunk(
  "subreddits/fetchSubreddits",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${rootURL}/subreddits.json`);
      const json = await response.json();

      return json.data.children.map((subreddit) => subreddit.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const subredditsSlice = createSlice({
  name: "subreddits",
  initialState: {
    subreddits: [],
    isLoadingSubreddits: false,
    hasSubredditError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        state.isLoadingSubreddits = true;
        state.hasSubredditError = false;
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.isLoadingSubreddits = false;
        state.hasSubredditError = false;
        state.subreddits = action.payload;
      })
      .addCase(fetchSubreddits.rejected, (state) => {
        state.isLoadingSubreddits = false;
        state.hasSubredditError = true;
      });
  },
});

export const selectSubreddits = (state) => state.subreddits.subreddits;
export const selectIsLoadingSubreddits = (state) =>
  state.subreddits.isLoadingSubreddits;
export const selectHasSubredditError = (state) => state.subreddits.hasSubredditError;
export default subredditsSlice.reducer;
