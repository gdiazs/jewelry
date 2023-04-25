import { createHashRouter } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./layouts/default";

export default createHashRouter([homeRoutes()]);

function homeRoutes() {
  return {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  };
}
