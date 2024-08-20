import { Link, useParams } from "react-router-dom";
import {
  fetchPosts,
  selectHasPostError,
  selectIsLoadingPosts,
  selectPosts,
} from "./postsSlice";
import { useDispatch, useSelector } from "react-redux";

import Post from "../../components/Post/Post";
import styles from "./Posts.module.css";
import { useEffect } from "react";

const Posts = () => {
  const dispatch = useDispatch();
  const { subreddit } = useParams();
  const posts = useSelector(selectPosts);
  const isLoadingPosts = useSelector(selectIsLoadingPosts);
  const hasPostError = useSelector(selectHasPostError);

  useEffect(() => {
    dispatch(fetchPosts(subreddit));
  }, [dispatch, subreddit]);

  if (isLoadingPosts) return <div>Loading...</div>;
  if (hasPostError) return <div>Something went wrong</div>;

  return (
    <section className={styles.section}>
      {posts.map((post) => (
        <Link key={post.id} to={`/${post.subreddit}/${post.id}`}>
          <Post {...post} />
        </Link>
      ))}
    </section>
  );
};

export default Posts;
