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
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <div className="col-start-1 row-start-1">
        <Logo />
      </div>

      <div className="col-start-2 row-start-1">
        <WorkspaceHeader />
      </div>

      <div className="col-start-1 row-start-2 h-full">
        <WorkspaceSidebar />
      </div>

      {isCreateTaskOpen && (
        <CreateTaskDialog open onClose={() => setIsCreateTaskOpen(false)} />
      )}

      <div className="relative col-start-2 row-start-2">
        <Outlet context={{ openCreateTask }} />
      </div>
    </div>
  );
};

export default MainLayout;
