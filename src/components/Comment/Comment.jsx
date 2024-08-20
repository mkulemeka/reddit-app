import PropTypes from "prop-types";
import { TbArrowBigUpLines } from "react-icons/tb";
import { formatCommentDate } from "../../utils";
import styles from "./Comment.module.css";
const Comment = ({ comment }) => {
  const commentDate = formatCommentDate(comment.created_utc);
  return (
    <article className={styles.comment}>
      <div className={styles.div__title}>
        <h3>{comment.author}</h3>
        <span>{commentDate}</span>
      </div>
      <div>{comment.body}</div>
      <div className={styles.comment__votes}>
        <TbArrowBigUpLines />
        <span>{comment.ups}</span>
      </div>
    </article>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string,
    body: PropTypes.string,
    created_utc: PropTypes.number,
    ups: PropTypes.number,
  }),
};

export default Comment;
