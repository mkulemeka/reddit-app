const rootURL = "https://www.reddit.com";

const redditConfig = {
  authorizeEndpoint: "/api/v1/authorize.compact",
  tokenEndpoint: "/api/v1/access_token",
  redirectURI: import.meta.env.VITE_REDIRECT_URI,
  clientID: import.meta.env.VITE_REDDIT_CLIENT_ID,
  clientSecret: import.meta.env.VITE_REDDIT_CLIENT_SECRET,
  duration: "permanent",
  state: "123",
  scope: [
    "read",
    "edit",
    "identity",
    "mysubreddits",
    "submit",
    "save",
    "subscribe",
  ].join(" "),
};

const localStorageKeys = {
  redditAccessToken: "redditAccessToken",
  redditRefreshToken: "redditRefreshToken",
  redditTokenExpires: "redditTokenExpires",
  redditTokenType: "redditTokenType",
  redditScope: "redditScope",
};

const redditAuth = {
  async getToken(code) {
    try {
      const response = await fetch(`${rootURL}${redditConfig.tokenEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            `${redditConfig.clientID}:${redditConfig.clientSecret}`
          )}`,
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${redditConfig.redirectURI}`,
      });

      if (!response.ok) throw new Error("Error getting token from Reddit");

      return await response.json();
    } catch (error) {
      console.error("Error getting token from Reddit", error);
    }
  },

  async refreshToken(refreshToken) {
    try {
      const response = await fetch(`${rootURL}${redditConfig.tokenEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            `${redditConfig.clientID}:${redditConfig.clientSecret}`
          )}`,
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      });

      if (!response.ok) throw new Error("Error refreshing token");

      return await response.json();
    } catch (error) {
      console.error("Error refreshing token", error);
    }
  },
};

const authService = {
  async handleCallback() {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      try {
        const token = await redditAuth.getToken(code);

        if (!token.access_token) throw new Error("Token not found");

        authUtility.saveToken(token);

        const url = new URL(window.location);
        url.searchParams.delete("code");
        url.searchParams.delete("state");

        const updatedUrl = url.search ? url.href : url.href.replace("#_", "");
        window.history.replaceState({}, document.title, updatedUrl);
      } catch (error) {
        console.error("Error getting token from Reddit", error);
      }
    }
  },

  async redirectToRedditAuth() {
    try {
      const redditAuthUrl = new URL(rootURL + redditConfig.authorizeEndpoint);
      const params = {
        client_id: redditConfig.clientID,
        response_type: "code",
        state: "123",
        redirect_uri: redditConfig.redirectURI,
        duration: redditConfig.duration,
        scope: redditConfig.scope,
      };

      redditAuthUrl.search = new URLSearchParams(params).toString();
      window.location.href = redditAuthUrl;
    } catch (error) {
      console.error("Error redirecting to Reddit authorize", error);
    }
  },
};

const authUtility = {
  saveToken(response) {
    const { access_token, bearer, refresh_token, expires_in, scope } = response;
    const tokenExpires = new Date(Date.now() + expires_in * 1000).toISOString();

    localStorage.setItem(localStorageKeys.redditAccessToken, access_token);
    localStorage.setItem(localStorageKeys.redditRefreshToken, refresh_token);
    localStorage.setItem(localStorageKeys.redditTokenExpires, tokenExpires);
    localStorage.setItem(localStorageKeys.redditTokenType, bearer);
    localStorageKeys.setItem(localStorageKeys.redditScope, scope);
  },

  clearTokens() {
    localStorage.clear();
  },
};

export { authService, authUtility };

export default rootURL;
