import Search from "./Search";
import Account from "./Account";
import calendar from "../icons/calendar.svg";
import message from "../icons/message.svg";
import notification from "../icons/notification.svg";

const menuIcons = [
  { src: calendar, alt: "calendar" },
  { src: message, alt: "message" },
  { src: notification, alt: "notification" },
];

const HorisontalMenu = () => {
  return (
    <div className="border-b border-[#DBDBDB] px-8 py-6">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-4">
        <div className="hidden min-[1054px]:block">
          <Search />
        </div>

        <div className="ml-auto flex items-center gap-8">
          <ul className="hidden min-[1054px]:flex items-center gap-6">
            {menuIcons.map(({ src, alt }) => (
              <li key={alt}>
                <img src={src} alt={alt} />
              </li>
            ))}
          </ul>

          <Account />
        </div>
      </div>
    </div>
  );
};

export default HorisontalMenu;
