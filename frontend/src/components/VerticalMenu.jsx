import { NavLink } from "react-router-dom";

import { useProject } from "../contexts/ProjectContext";

import category from "../icons/category.svg";
import task from "../icons/task.svg";
import members from "../icons/members.svg";
import addSquare from "../icons/add_square.svg";

const menuItems = [
  { icon: category, label: "Home", path: "/" },
  { icon: task, label: "Task", path: "/tasks-list" },
  { icon: members, label: "Members", path: "/members" },
];

const VerticalMenu = () => {
  const { projects, selectedProject, setSelectedProject } = useProject();

  return (
    <aside className="h-full border-r border-[#DBDBDB] px-4 py-6">
      <ul className="flex flex-col gap-2 pb-6">
        {menuItems.map(({ icon, label, path }) => (
          <NavLink key={label} to={path}>
            {({ isActive }) => (
              <div
                className={`flex items-center gap-2 rounded-md p-2 transition-colors duration-200 ${
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
              </div>
            )}
          </NavLink>
        ))}
      </ul>

      <div className="flex justify-between border-t border-[#DBDBDB] py-6">
        <p className="font-inter text-xs font-bold text-[#787486]">
          MY PROJECTS
        </p>

        <img src={addSquare} alt="Add project" className="cursor-pointer" />
      </div>

      <ul className="flex flex-col gap-2">
        {projects.map((project) => {
          const isActive = selectedProject?.id === project.id;

          return (
            <li
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`flex cursor-pointer items-center gap-2 rounded-md p-2 transition-colors duration-200 ${
                isActive ? "bg-[#F1EEFC]" : "hover:bg-[#F1EEFC]"
              }`}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: project.color }}
              />

              <span
                className={`font-inter ${
                  isActive ? "font-semibold text-[#0D062D]" : "text-[#787486]"
                }`}
              >
                {project.title}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default VerticalMenu;
