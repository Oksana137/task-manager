import { useState } from "react";
import { Outlet } from "react-router-dom";
import WorkspaceHeader from "../components/WorkspaceHeader";
import WorkspaceSidebar from "../components/WorkspaceSidebar";
import CreateTaskDialog from "../components/CreateTaskDialog";
import Logo from "../components/Logo";

const MainLayout = () => {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const openCreateTask = () => setIsCreateTaskOpen(true);

  return (
    <div className="grid h-screen grid-cols-[minmax(8rem,24vw)_minmax(0,1fr)] grid-rows-[5.5rem_minmax(0,1fr)] bg-white lg:grid-cols-[clamp(13rem,18.3vw,17.5rem)_minmax(0,1fr)]">
      <div
        aria-hidden="true"
        className="pointer-events-none col-start-1 row-span-2 row-start-1 bg-[#231337] bg-[radial-gradient(ellipse_110%_13rem_at_48%_-2rem,rgba(184,144,255,0.34),transparent_85%)]"
      />
      <div className="relative col-start-1 row-start-1">
        <Logo />
      </div>

      <div className="col-start-2 row-start-1">
        <WorkspaceHeader />
      </div>

      <div className="relative col-start-1 row-start-2 min-h-0">
        <WorkspaceSidebar />
      </div>

      {isCreateTaskOpen && (
        <CreateTaskDialog open onClose={() => setIsCreateTaskOpen(false)} />
      )}

      <div className="relative col-start-2 row-start-2 min-h-0 min-w-0">
        <Outlet context={{ openCreateTask }} />
      </div>
    </div>
  );
};

export default MainLayout;
