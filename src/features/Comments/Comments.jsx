import {
  fetchComments,
  selectComments,
  selectHasError,
  selectIsLoadingComments,
} from "./commentsSlice";
import { useDispatch, useSelector } from "react-redux";

import Comment from "../../components/Comment/Comment";
import Loading from "../../components/Loading/Loading";
import PropTypes from "prop-types";
import styles from "./Comments.module.css";
import { useEffect } from "react";

const Comments = ({ permalink }) => {
  const dispatch = useDispatch();
  const isLoadingComments = useSelector(selectIsLoadingComments);
  const hasError = useSelector(selectHasError);
  const comments = useSelector(selectComments);

  useEffect(() => {
    dispatch(fetchComments(permalink));
  }, [dispatch, permalink]);

  if (isLoadingComments) return <Loading />;
  if (hasError) return <p>Error</p>;

  return (
    <section className={styles.section__comments}>
      {comments.slice(2).map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </section>
  );
};

Comments.propTypes = {
  permalink: PropTypes.string.isRequired,
};

export default Comments;
