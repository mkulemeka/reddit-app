import PropTypes from "prop-types";
import redditLogo from "../../assets/reddit-logo.svg";
import styles from "./Subreddit.module.css";
const Subreddit = ({ banner_img, display_name }) => {
  return (
    <div className={styles.subreddit}>
      <figure className={styles.subreddit__image}>
        <img src={banner_img || redditLogo} alt={display_name} />
      </figure>
      <h4>{display_name}</h4>
    </div>
  );
};

Subreddit.propTypes = {
  banner_img: PropTypes.string,
  display_name: PropTypes.string,
};

export default Subreddit;
