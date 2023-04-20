import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";


export default createBrowserRouter([homeRoutes()]);

function homeRoutes() {
  return {
    path: "/home/a",
    element: <Home/>,
  };
}
