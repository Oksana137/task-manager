import TaskSearch from "./TaskSearch";
import AccountMenu from "./AccountMenu";
import calendar from "../icons/calendar.svg";
import message from "../icons/message.svg";
import notification from "../icons/notification.svg";

const WorkspaceHeader = () => {
  return (
    <div className="border-b border-[#DBDBDB] px-8 py-6 min-[1054px]:pr-10">
      <div className="flex items-center justify-end gap-6">
        <div className="hidden min-[1054px]:block">
          <TaskSearch />
        </div>

        <AccountMenu />
      </div>
    </div>
  );
};

export default WorkspaceHeader;
