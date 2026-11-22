import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { useProject } from "../contexts/ProjectContext";

import category from "../icons/category.svg";
import task from "../icons/task.svg";
import addSquare from "../icons/add_square.svg";

const menuItems = [
  { icon: category, label: "Home", path: "/" },
  { icon: task, label: "Tasks", path: "/tasks-list" },
];

const projectSaveErrors = {
  400: "Enter a project name between 1 and 255 characters.",
  401: "Your session expired. Sign in again to save the project.",
  404: "This server does not support creating projects yet.",
};

const VerticalMenu = () => {
  const { projects, selectedProject, setSelectedProject, addProject } = useProject();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const addButton = useRef(null);
  const saveRequest = useRef(null);

  useEffect(() => () => saveRequest.current?.abort(), []);

  const closeForm = () => {
    setIsFormOpen(false);
    setProjectName("");
    setError("");
    addButton.current?.focus();
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const title = projectName.trim();
    if (!title || saveRequest.current) return;

    const controller = new AbortController();
    saveRequest.current = controller;
    setIsSaving(true);
    setError("");

    try {
      await addProject(title, controller.signal);
      if (!controller.signal.aborted) closeForm();
    } catch (requestError) {
      if (controller.signal.aborted) return;
      setError(
        projectSaveErrors[requestError.status] ?? "Could not save the project. Please try again.",
      );
    } finally {
      saveRequest.current = null;
      if (!controller.signal.aborted) setIsSaving(false);
    }
  };

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

        <button
          ref={addButton}
          type="button"
          aria-label="Add project"
          aria-expanded={isFormOpen}
          aria-controls={isFormOpen ? "new-project-form" : undefined}
          onClick={() => {
            if (isSaving) return;
            if (isFormOpen) closeForm();
            else setIsFormOpen(true);
          }}
          className="cursor-pointer rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5030E5]"
        >
          <img src={addSquare} alt="" />
        </button>
      </div>

      {isFormOpen && (
        <form
          id="new-project-form"
          onSubmit={handleSave}
          onKeyDown={(event) => {
            if (event.key === "Escape" && !isSaving) closeForm();
          }}
          className="mb-3 ml-auto flex w-48 max-w-full flex-col gap-2"
        >
          <label htmlFor="new-project-name" className="sr-only">
            Project name
          </label>
          <input
            id="new-project-name"
            type="text"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            placeholder="Project name"
            maxLength={255}
            required
            autoFocus
            readOnly={isSaving}
            aria-describedby={error ? "new-project-error" : undefined}
            className="w-full rounded-2xl border border-[#DED5FA] bg-[#F7F4FF] px-3 py-2 text-sm text-[#0D062D] caret-[#5030E5] outline-none [filter:drop-shadow(0_0_0.65px_#AB9ACF)_drop-shadow(0_5px_9px_rgba(80,48,229,0.12))] placeholder:text-[#787486] focus:border-[#AB9ACF] focus:bg-[#F3EEFF]"
          />
          {error && (
            <p id="new-project-error" role="alert" className="text-xs text-red-600">
              {error}
            </p>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeForm}
              disabled={isSaving}
              className="rounded-full px-2.5 py-1.5 text-xs font-medium text-[#625F6D] hover:bg-[#EFE9FF] disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || !projectName.trim()}
              className="rounded-full bg-[#5030E5] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#4123D7] disabled:opacity-60"
            >
              {isSaving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      )}

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
