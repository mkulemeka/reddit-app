import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./containers/Home";
import Login from "./components/Login/Login";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
