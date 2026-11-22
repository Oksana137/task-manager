import TaskSearch from "./TaskSearch";
import AccountMenu from "./AccountMenu";
import calendar from "../icons/calendar.svg";
import message from "../icons/message.svg";
import notification from "../icons/notification.svg";

const WorkspaceHeader = () => {
  return (
    <div className="border-b border-[#DBDBDB] px-8 py-6">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-4">
        <div className="hidden min-[1054px]:block">
          <TaskSearch />
        </div>

        <div className="ml-auto flex items-center gap-8">

          <AccountMenu />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceHeader;