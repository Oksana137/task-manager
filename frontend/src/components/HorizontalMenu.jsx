import Search from "./Search";
import Account from "./Account";
import calendar from "../icons/calendar.svg";
import message from "../icons/message.svg";
import notification from "../icons/notification.svg";

const HorizontalMenu = () => {
  return (
    <div className="border-b border-[#DBDBDB] px-8 py-6">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-4">
        <div className="hidden min-[1054px]:block">
          <Search />
        </div>

        <div className="ml-auto flex items-center gap-8">

          <Account />
        </div>
      </div>
    </div>
  );
};

export default HorizontalMenu;