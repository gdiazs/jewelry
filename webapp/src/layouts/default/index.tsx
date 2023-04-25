import { Outlet } from "react-router-dom";
import "./index.css";
import Logo from './logo.png';
import { Button } from "primereact/button";

const Main = () => {
  return (
    <div className="text-base">
      <div className="row h-4rem bg-white shadow-3 flex aling-items-center justify-content-between">
        <div className="mt-3 ml-3 text-center">
          <img src={Logo} alt="Joyería" className="h-2rem" />
        </div>
        <div className="mt-3">
          <div className="mr-3">
            <Button label="0" icon="pi pi-shopping-cart" />
          </div>
        </div>
      </div>
      <div className="row mt-3 ">
        <div className="col md:col-8 md:col-offset-2">
          <div className="shadow-2 m-2 p-2 border-round">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
