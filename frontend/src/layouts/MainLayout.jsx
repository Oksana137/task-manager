import { Outlet } from "react-router-dom";
import HorizontalMenu from "../components/HorizontalMenu";
import VerticalMenu from "../components/VerticalMenu";
import Logo from "../components/Logo";

const MainLayout = () => {
  return (
      <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
        <Logo />
        <HorizontalMenu />
        <VerticalMenu />
        <Outlet />
      </div>
  );
};

export default MainLayout;
