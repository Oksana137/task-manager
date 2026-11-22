import TaskSearch from "./TaskSearch";
import AccountMenu from "./AccountMenu";

const WorkspaceHeader = () => {
  return (
    <div className="flex h-full items-center justify-end border-b border-[#E2DCEC] bg-white px-8 min-[1054px]:pr-10">
      <div className="flex min-w-0 items-center justify-end gap-6">
        <div className="hidden w-[clamp(18rem,28vw,27rem)] min-[1054px]:block">
          <TaskSearch />
        </div>

        <AccountMenu />
      </div>
    </div>
  );
};

export default WorkspaceHeader;
