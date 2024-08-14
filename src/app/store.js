import commentsReducer from "../features/Comments/commentsSlice";
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/Search/searchSlice";
import subredditsReducer from "../features/Subreddits/subredditsSlice";
import votesReducer from "../features/Votes/votesSlice";

export default configureStore({
  reducer: {
    comments: commentsReducer,
    search: searchReducer,
    subreddits: subredditsReducer,
    votes: votesReducer,
  },
});
