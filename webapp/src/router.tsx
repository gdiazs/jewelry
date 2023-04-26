import { createHashRouter } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./layouts/default";
import Cart from "./pages/Cart";

export default createHashRouter([homeRoutes(), cartRoutes()]);

function homeRoutes() {
  return {
    path: "/",
    element: <Main title="Todas las joyas" />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  };
}

function cartRoutes() {
  return {
    path: "/cart",
    element: <Main title="Carrito de compras" />,
    children: [
      {
        index: true,
        element: <Cart />,
      },
    ],
  };
}
