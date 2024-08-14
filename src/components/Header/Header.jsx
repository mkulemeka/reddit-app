import { HiMenuAlt3 } from "react-icons/hi";
import Search from "../../features/Search/Search";
import { SiReddit } from "react-icons/si";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <header className={styles.header}>
      <SiReddit className={styles.header__logo}/>
      <Search />
      <HiMenuAlt3 className={styles.header__menu}/>
    </header>
  );
};

export default Header;
