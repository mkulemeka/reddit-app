import { fetchSubreddits, selectSubreddits } from "./subredditsSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Subreddit from "../../components/Subreddit/Subreddit";
import { useEffect } from "react";

const SubReddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  if (!subreddits || subreddits.length === 0) return <div>No subreddits found</div>;

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
