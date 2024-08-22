import SubReddits from "../../features/Subreddits/SubReddits";
import styles from "./SidePanel.module.css";
const SidePanel = () => {
  return (
    <aside className={styles.aside}>
      <SubReddits />
    </aside>
  );
};

export default SidePanel;
