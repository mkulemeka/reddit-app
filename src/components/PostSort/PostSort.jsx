import { MdKeyboardArrowDown } from "react-icons/md";
import { sortPosts } from "../../features/Posts/postsSlice";
import styles from './PostSort.module.css'
import { useDispatch } from "react-redux";
import { useState } from "react";
const sortOptions = ["Upvotes", "Date", "Comments"];
const PostSort = () => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Sort by");
  
  const handleSort = (option) => {
    setSelectedOption(option);
    dispatch(sortPosts(option.toLowerCase()));
    setShowOptions(false);
  };
  
  return (
    <div className={styles.sortDropDown}>
      <button className={`${styles.sortButton} ${styles.button}`} onClick={() => setShowOptions((prev) => !prev)}>
        {selectedOption}
        <MdKeyboardArrowDown />
      </button>
      {showOptions && (
        <div className={styles.buttonContainer}>
          {sortOptions.map((option, index) => (
            <button
              key={option + index}
              className={styles.button}
              onClick={({ target }) => handleSort(target.innerText)}
              value={option}
              aria-label={`Select ${option}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostSort;
