import Sort from "../../features/Sort/Sort";
import SubReddits from "../../features/Subreddits/SubReddits";
import styles from "./SidePanel.module.css";
const SidePanel = () => {
  return (
    <aside className={styles.aside}>
      <Sort />
      <SubReddits />
    </aside>
  );
};

export default SidePanel;
