import { Outlet } from "react-router-dom";
import HorisontalMenu from "../components/HorisontalMenu";
import VerticalMenu from "../components/VerticalMenu";
import Home from "../components/Home";

const MainLayout = () => {
  return (
      <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
        <Home />
        <HorisontalMenu />
        <VerticalMenu />
        <Outlet />
      </div>
  );
};

export default MainLayout;
