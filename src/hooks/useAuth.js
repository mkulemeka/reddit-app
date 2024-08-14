import { authService, authUtility } from "../api/reddit";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("redditAccessToken"));

  useEffect(() => {
    const authorize = async () => {
      try {
        await authService.handleCallback();
        
        const token = localStorage.getItem("redditAccessToken");
        const tokenExpires = localStorage.getItem("redditTokenExpires");
        const { currentTime, expirationTime } = sessionTime(tokenExpires);

        if (!token || currentTime > expirationTime) {
          setIsAuthenticated(false);
          authUtility.clearTokens();
          return;
        }

        setIsAuthenticated(true);
        setToken(token);
      } catch (error) {
        console.error("Error authorizing", error);
        authUtility.clearTokens();
      }
    };

    authorize();
  }, []);

  return { isAuthenticated, token };
};

const sessionTime = (tokenExpiration = "") => {
  const expirationTime = new Date(tokenExpiration).getTime();
  const currentTime = Date.now();
  const timeLeft = expirationTime - currentTime;

  return { timeLeft, currentTime, expirationTime };
};

export default useAuth;
