import { fetchSubreddits, selectHasSubredditError, selectIsLoadingSubreddits, selectSubreddits } from "./subredditsSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Subreddit from "../../components/Subreddit/Subreddit";
import { useEffect } from "react";

const SubReddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  const isLoadingSubreddits = useSelector(selectIsLoadingSubreddits);
  const hasSubredditError = useSelector(selectHasSubredditError);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  if (isLoadingSubreddits) return <Loading />;
  if (hasSubredditError) return <div>Failed to load subreddits</div>;

  return (
    <section>
      {subreddits.map(({ id, display_name, banner_img }) => (
        <Link key={id} to={`/${display_name}`}>
          <Subreddit display_name={display_name} banner_img={banner_img} />
        </Link>
      ))}
    </section>
  );
};

export default SubReddits;
