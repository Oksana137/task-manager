import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { useProject } from "../contexts/ProjectContext";

import category from "../icons/category.svg";
import task from "../icons/task.svg";

const menuItems = [
  { icon: category, label: "Home", path: "/" },
  { icon: task, label: "Tasks", path: "/tasks-list" },
];

const projectSaveErrors = {
  400: "Enter a project name between 1 and 255 characters.",
  401: "Your session expired. Sign in again to save the project.",
  404: "This server does not support creating projects yet.",
};

const WorkspaceSidebar = () => {
  const { projects, selectedProject, setSelectedProject, addProject } = useProject();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const addButton = useRef(null);
  const projectDialog = useRef(null);
  const saveRequest = useRef(null);

  useEffect(() => () => saveRequest.current?.abort(), []);

  useEffect(() => {
    if (isFormOpen) projectDialog.current?.showModal();
  }, [isFormOpen]);

  const closeForm = () => {
    projectDialog.current?.close();
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
    <aside className="h-full overflow-y-auto px-3.5 py-4 text-white">
      <ul className="flex flex-col gap-1 pb-5">
        {menuItems.map(({ icon, label, path }) => (
          <NavLink key={label} to={path}>
            {({ isActive }) => (
              <div
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-200 lg:px-4 lg:text-base ${
                  isActive ? "bg-[#51388A] text-white" : "text-[#E3DCEF] hover:bg-white/10"
                }`}
              >
                <img src={icon} alt="" className="size-5 shrink-0 brightness-0 invert" />
                <span>{label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </ul>

      <div className="mx-3.5 flex items-center justify-between border-t border-white/25 py-4">
        <p className="text-xs font-semibold text-[#E3DCEF]">
          MY PROJECTS
        </p>

        <button
          ref={addButton}
          type="button"
          aria-label="Add project"
          aria-haspopup="dialog"
          aria-expanded={isFormOpen}
          aria-controls={isFormOpen ? "new-project-dialog" : undefined}
          onClick={() => {
            if (isSaving) return;
            if (isFormOpen) closeForm();
            else setIsFormOpen(true);
          }}
          className="grid size-6 shrink-0 place-items-center rounded-md text-xl leading-none hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>

      {isFormOpen && (
        <dialog
          ref={projectDialog}
          id="new-project-dialog"
          aria-labelledby="new-project-heading"
          onCancel={(event) => {
            event.preventDefault();
            if (!isSaving) closeForm();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget && !isSaving) closeForm();
          }}
          className="m-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-3xl bg-white p-0 text-[#0D062D] shadow-[0_24px_64px_rgba(26,15,44,0.28)] backdrop:bg-[#211632]/45 backdrop:backdrop-blur-sm"
        >
          <form id="new-project-form" onSubmit={handleSave} className="px-5 sm:px-6">
            <div className="flex items-center justify-between gap-4 border-b border-[#DDD5EB] py-4">
              <h2 id="new-project-heading" className="text-2xl font-bold tracking-tight">
                New Project
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={closeForm}
                disabled={isSaving}
                className="grid size-9 shrink-0 place-items-center rounded-lg text-2xl leading-none text-[#503681] transition hover:bg-[#F1EBF8] disabled:opacity-60"
              >
                &times;
              </button>
            </div>

            <div className="py-5">
              <label htmlFor="new-project-name" className="mb-1.5 block text-sm font-semibold">
                Project name
              </label>
              <input
                id="new-project-name"
                type="text"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                placeholder="e.g. Website redesign"
                maxLength={255}
                required
                autoFocus
                readOnly={isSaving}
                aria-describedby={error ? "new-project-error" : undefined}
                className="h-11 w-full rounded-xl border border-[#A89BC4] bg-white px-3.5 text-sm outline-none transition placeholder:text-[#716588] focus:border-[#503681] focus:ring-2 focus:ring-[#E7DFF4]"
              />
              {error && (
                <p id="new-project-error" role="alert" className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-[#DDD5EB] py-4">
              <button
                type="button"
                onClick={closeForm}
                disabled={isSaving}
                className="h-11 rounded-xl border border-[#79639C] bg-white px-5 text-sm font-semibold text-[#503681] transition hover:bg-[#F1EBF8] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving || !projectName.trim()}
                className="h-11 rounded-xl bg-[#503681] px-5 text-sm font-semibold text-white transition hover:bg-[#432C6D] disabled:opacity-60"
              >
                {isSaving ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </dialog>
      )}

      <ul className="flex flex-col gap-1">
        {projects.map((project) => {
          const isActive = selectedProject?.id === project.id;

          return (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                aria-pressed={isActive}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors lg:px-4 lg:text-base ${
                  isActive ? "bg-[#49346F] font-semibold text-white" : "text-[#E3DCEF] hover:bg-white/10"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <span className="min-w-0 truncate" title={project.title}>{project.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default WorkspaceSidebar;
