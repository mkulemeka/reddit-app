import { HiMenuAlt3 } from "react-icons/hi";
import PropTypes from "prop-types";
import Search from "../../features/Search/Search";
import { SiReddit } from "react-icons/si";
import styles from "./Header.module.css";
const Header = ({ setIsMenuOpen, windowWidth }) => {
  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div>
        <SiReddit className={styles.header__logo} />
        <h1>
          Reddit<span>Minimal</span>
        </h1>
      </div>
      <Search />
      {windowWidth <= 768 && (
        <HiMenuAlt3 className={styles.header__menu} onClick={handleMenuClick} />
      )}
    </header>
  );
};

Header.propTypes = {
  setIsMenuOpen: PropTypes.func,
  windowWidth: PropTypes.number,
};

export default Header;
