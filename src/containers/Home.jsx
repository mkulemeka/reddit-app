import Header from "../components/Header/Header";
import SidePanel from "../components/SidePanel/SidePanel";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Home = () => {
  // const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();
  // if (!isAuthenticated) {
  //   navigate("/login");
  // }

  return (
    <main>
      <Header />
      <SidePanel />
    </main>
  );
};

export default Home;
