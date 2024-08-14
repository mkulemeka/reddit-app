import { authService } from "../../api/reddit";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleRedirect = async () => {
    await authService.redirectToRedditAuth();
    if (isAuthenticated) {
      navigate("/");
    }
  };

  return <button onClick={handleRedirect}>Login</button>;
};

export default Login;
