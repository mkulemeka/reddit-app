import { createSlice } from "@reduxjs/toolkit";

const votesSlice = createSlice({
  name: "votes",
  initialState: {
    votes: 0,
    hasVoted: false
  },
  reducers: {
    upVote: (state) => {
      state.votes += 1;
    },
    downVote: (state) => {
      state.votes -= 1;
    },
  },
});

export const hasVoted = (state) => state.votes.hasVoted;
export const { upVote, downVote } = votesSlice.actions;
export default votesSlice.reducer;
