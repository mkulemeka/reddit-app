import PropTypes from "prop-types";
import styles from "./PostFilter.module.css";
const PostFilter = ({ handleFilter }) => {
  return (
    <div className={styles.div}>
      <input
        type="radio"
        name="filter"
        value="all"
        id="all"
        defaultChecked
        onChange={handleFilter}
      />
      <label htmlFor="all">All</label>
      <input
        type="radio"
        name="filter"
        value="new"
        id="new"
        onChange={handleFilter}
      />
      <label htmlFor="new">New</label>
      <input
        type="radio"
        name="filter"
        value="hot"
        id="hot"
        onChange={handleFilter}
      />
      <label htmlFor="hot">Hot</label>
      <input
        type="radio"
        name="filter"
        value="top"
        id="top"
        onChange={handleFilter}
      />
      <label htmlFor="top">Top</label>
    </div>
  );
};

PostFilter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default PostFilter;
