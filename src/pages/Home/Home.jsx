import { Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../../components/Header/Header";
import Posts from "../../features/Posts/Posts";
import SidePanel from "../../components/SidePanel/SidePanel";
import styles from "./Home.module.css";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();
  // if (!isAuthenticated) {
  //   navigate("/login");
  // }

  return (
    <main className={styles.home}>
      <Header setIsMenuOpen={setIsMenuOpen} />
      {isMenuOpen && <SidePanel />}
      <Outlet />
    </main>
  );
};

export default Home;
