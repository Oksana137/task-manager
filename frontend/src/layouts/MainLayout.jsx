import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HorizontalMenu from "../components/HorizontalMenu";
import VerticalMenu from "../components/VerticalMenu";
import MembersList from "../components/MembersList";
import CreateTask from "../components/CreateTask";
import Logo from "../components/Logo";
import { useProjectTasks } from "../hooks/useProjectTasks";

const MainLayout = () => {
  const location = useLocation();
  const isTasksBoardPage = location.pathname === "/";
  const isTasksListPage = location.pathname === "/tasks-list";

  const filteredTasks = useProjectTasks();
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

  return (
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr]">
      <div className="col-start-1 row-start-1">
        <Logo />
      </div>

      <div className="col-start-2 row-start-1">
        <HorizontalMenu />
      </div>

      <div className="col-start-1 row-start-2 row-span-2 h-full">
        <VerticalMenu />
      </div>

      {(isTasksBoardPage || isTasksListPage) && (
        <div className="col-start-2 row-start-2 flex items-center justify-between bg-[#F8F9FD] px-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-[#0D062D]">Tasks</h1>

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEEAFD] text-sm font-semibold text-[#625F6D]">
              {filteredTasks.length}
            </div>
          </div>

          <MembersList />
        </div>
      )}

      {isTasksListPage && (
        <>
          <button
            type="button"
            onClick={() => setIsCreateTaskOpen(true)}
            aria-label="Create task"
            className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#5030E5] text-white shadow-lg transition hover:bg-[#4123D7]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              className="h-6 w-6"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>

          <CreateTask
            open={isCreateTaskOpen}
            onClose={() => setIsCreateTaskOpen(false)}
          />
        </>
      )}

      <div className="col-start-2 row-start-3">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
