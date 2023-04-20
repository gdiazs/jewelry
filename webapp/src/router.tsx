import { createHashRouter } from "react-router-dom";
import Home from "./pages/Home";


export default createHashRouter([homeRoutes()]);

function homeRoutes() {
  return {
    path: "/home/a",
    element: <Home/>,
  };
}
