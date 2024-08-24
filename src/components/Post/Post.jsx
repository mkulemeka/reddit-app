import { MdOutlineModeComment } from "react-icons/md";
import PropTypes from "prop-types";
import { TbArrowBigUpLines } from "react-icons/tb";
import { decodeUrl } from "../../utils";
import styles from "./Post.module.css";

const Post = ({
  title,
  author,
  thumbnail,
  preview,
  num_comments,
  ups,
  selftext,
}) => {
  const postImage = decodeUrl(preview?.images[0]?.source?.url, thumbnail);
  return (
    <article className={styles.post_article}>
      <h2>{title}</h2>
      <p  className={styles.selfText}>{selftext}</p>
      {postImage && (
        <figure className={styles.post__figure} >
          <img loading="lazy" src={postImage} alt={title} />
          <div ></div>
        </figure>
      )}
      <div className={styles.post__stats}>
        <div>
          <TbArrowBigUpLines />
          <p>{ups}</p>
        </div>
        <div>
          <MdOutlineModeComment />
          <p>{num_comments}</p>
        </div>
        <p>{author}</p>
      </div>
    </article>
  );
};

Post.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  thumbnail: PropTypes.string,
  num_comments: PropTypes.number,
  ups: PropTypes.number,
  preview: PropTypes.object,
  selftext: PropTypes.string,
};

export default Post;
