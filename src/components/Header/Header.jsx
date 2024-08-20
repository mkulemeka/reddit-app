import { HiMenuAlt3 } from "react-icons/hi";
import PropTypes from "prop-types";
import Search from "../../features/Search/Search";
import { SiReddit } from "react-icons/si";
import styles from "./Header.module.css";
const Header = ({ setIsMenuOpen }) => {
  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <SiReddit className={styles.header__logo} />
      <Search />
      <HiMenuAlt3 className={styles.header__menu} onClick={handleMenuClick} />
    </header>
  );
};

Header.propTypes = {
  setIsMenuOpen: PropTypes.func,
};

export default Header;
