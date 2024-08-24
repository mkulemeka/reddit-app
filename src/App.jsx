import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import PostDetailsPage from "./pages/PostDetailsPage/PostDetailsPage";
import Posts from "./features/Posts/Posts";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/Home" replace />,
    },
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: ":subreddit",
          element: <Posts />,
        },
        {
          path: ":subreddit/:id",
          element: <PostDetailsPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
