import commentsReducer from "../features/Comments/commentsSlice";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/Posts/postsSlice";
import searchReducer from "../features/Search/searchSlice";
import subredditsReducer from "../features/Subreddits/subredditsSlice";
import votesReducer from "../features/Votes/votesSlice";
export default configureStore({
  reducer: {
    comments: commentsReducer,
    posts: postsReducer,
    search: searchReducer,
    subreddits: subredditsReducer,
    votes: votesReducer,
  },
});
