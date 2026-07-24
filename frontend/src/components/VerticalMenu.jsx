import { useState } from "react";

import category from "../icons/category.svg";
import messages from "../icons/messages.svg";
import task from "../icons/task.svg";
import members from "../icons/members.svg";
import settings from "../icons/settings.svg";
import addSquare from "../icons/add_square.svg";

const menuItems = [
  { icon: category, label: "Home" },
  { icon: messages, label: "Messages" },
  { icon: task, label: "Task" },
  { icon: members, label: "Members" },
  { icon: settings, label: "Settings" },
];

const projectItems = [
  { color: "#7AC555", label: "Mobile App" },
  { color: "#FFA500", label: "Website Redesign" },
  { color: "#E4CCFD", label: "Design System" },
  { color: "#76A5EA", label: "Wireframes" },
];

const VerticalMenu = () => {
  const [activeItem, setActiveItem] = useState("Home");

  return (
    <aside className="border-r border-[#DBDBDB] px-4 py-6">
      <ul className="flex flex-col gap-2 pb-6">
        {menuItems.map(({ icon, label }) => {
          const isActive = activeItem === label;

          return (
            <li
              key={label}
              onClick={() => setActiveItem(label)}
              className={`p-2 flex items-center gap-1 cursor-pointer rounded-md transition-colors duration-200 ${
                isActive ? "bg-[#F1EEFC]" : "hover:bg-[#F1EEFC]"
              }`}
            >
              <img src={icon} alt={label} />

              <p
                className={`font-inter ${
                  isActive ? "font-semibold text-[#0D062D]" : "text-[#787486]"
                }`}
              >
                {label}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-between border-t border-[#DBDBDB] py-6">
        <p className="font-inter text-xs font-bold text-[#787486]">
          MY PROJECTS
        </p>

        <img src={addSquare} alt="Add project" />
      </div>

      <ul className="flex flex-col gap-2">
        {projectItems.map(({ color, label }) => {
          const isActive = activeItem === label;

          return (
            <li
              key={label}
              onClick={() => setActiveItem(label)}
              className={`p-2 flex items-center gap-2 cursor-pointer rounded-md transition-colors duration-200 ${
                isActive ? "bg-[#F1EEFC]" : "hover:bg-[#F1EEFC]"
              }`}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />

              <span
                className={`font-inter ${
                  isActive ? "font-semibold text-[#0D062D]" : "text-[#787486]"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default VerticalMenu;
