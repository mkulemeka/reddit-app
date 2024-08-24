import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import Posts from "../../features/Posts/Posts";
import SidePanel from "../../components/SidePanel/SidePanel";
import styles from "./Home.module.css";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window?.innerWidth);

  // const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();
  // if (!isAuthenticated) {
  //   navigate("/login");
  // }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    if (windowWidth >= 768) setIsMenuOpen(true);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  

  return (
    <main className={styles.home}>
      <Header setIsMenuOpen={setIsMenuOpen} windowWidth={windowWidth} />
      {isMenuOpen && <SidePanel />}
      <section className={styles.section}>
        <Outlet />
      </section>
    </main>
  );
};

export default Home;
