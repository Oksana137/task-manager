import { Outlet } from "react-router-dom";
import HorizontalMenu from "../components/HorizontalMenu";
import VerticalMenu from "../components/VerticalMenu";
import MembersList from "../components/MembersList";
import Logo from "../components/Logo";

const MainLayout = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr]">
      <div className="col-start-1 row-start-1">
        <Logo />
      </div>

      <div className="col-start-2 row-start-1">
        <HorizontalMenu />
      </div>

      <div className="col-start-1 row-start-2 row-span-2">
        <VerticalMenu />
      </div>

      <div className="col-start-2 row-start-2 flex justify-end bg-[#F8F9FD] px-8">
        <MembersList />
      </div>

      <div className="col-start-2 row-start-3">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
