import { fetchSubreddits, selectSubreddits } from "./subredditsSlice";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

const SubReddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  if (!subreddits || subreddits.length === 0) return <div>No subreddits found</div>;
  console.log(subreddits);
  return (
    <div>
      {subreddits.map((subreddit) => (
        <div key={subreddit.id}>{subreddit.display_name}</div>
      ))}
    </div>
  );
};

export default SubReddits;
