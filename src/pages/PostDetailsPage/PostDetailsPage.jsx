import Comments from "../../features/Comments/Comments";
import { decodeUrl } from "../../utils";
import { selectPost } from "../../features/Posts/postsSlice";
import styles from "./PostDetailsPage.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const PostDetailsPage = () => {
  const { id } = useParams();
  const post = useSelector(selectPost(id));

  if (!post) return <p>failed to load post</p>;

  const postThumbnail =
    decodeUrl(post.preview?.images[0]?.source?.url, post.thumbnail);

  return (
    <section className={styles.section}>
      <h2>{post.title}</h2>
      {post.selftext && <p>{post.selftext}</p>}
      {postThumbnail && (
        <figure className={styles.post_image}>
          <img loading="lazy" src={postThumbnail} alt={post.title} />
        </figure>
      )}
      <Comments permalink={post?.permalink} />
    </section>
  );
};

export default PostDetailsPage;
