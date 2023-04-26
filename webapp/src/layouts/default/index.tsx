import { Outlet } from "react-router-dom";
import "./index.css";
import { useEffect } from "react";
import Nav from "../../components/molecules/Nav";

type LayoutProps = {
  title: string;
};

const Main = (props: LayoutProps) => {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <div className="text-base">
      <Nav />
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
