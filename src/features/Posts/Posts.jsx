import { Link, useParams } from "react-router-dom";
import { Loading, Post, PostFilter, PostSort } from "../../components";
import {
  fetchPosts,
  filterPosts,
  selectHasPostError,
  selectIsLoadingPosts,
  selectPosts,
  sortPosts,
} from "./postsSlice";
import { useDispatch, useSelector } from "react-redux";

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

  if (isLoadingPosts) return <Loading />;
  if (hasPostError) return <div>Something went wrong</div>;

  const handleFilter = ({ target }) => {
    dispatch(filterPosts(target.value));
  };

  return (
    <section className={styles.section__posts}>
      <section className={styles.section__filterSort}>
        <PostSort />
        <PostFilter handleFilter={handleFilter} />
      </section>
      <section>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post.id} to={`/${post.subreddit}/${post.id}`}>
              <Post {...post} />
            </Link>
          ))
        ) : (
          <div className={styles.div}>No posts found</div>
        )}
      </section>
    </section>
  );
};

export default Posts;
