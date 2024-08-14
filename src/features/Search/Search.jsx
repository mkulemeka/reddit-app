import { CiSearch } from "react-icons/ci";
import { setSearchTerm } from "./searchSlice";
import styles from "./Search.module.css";
import { useDispatch } from "react-redux";
import { useRef } from "react";
const Search = () => {
  const dispatch = useDispatch();
  const searchInput = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.current.value) return;
    dispatch(setSearchTerm(searchInput.current.value));
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <input
        className={styles.input}
        ref={searchInput}
        type="text"
        placeholder="Search"
      />
      <button className={styles.search__button} type="submit">
        <CiSearch />
      </button>
    </form>
  );
};

export default Search;
