import { useEffect, useId, useState } from "react";
import { createTask } from "../units/network";
import { useProject } from "../contexts/ProjectContext";
import { useTasks } from "../contexts/TasksContext";

const statuses = ["To Do", "On Progress", "Done"];
const priorities = ["Low", "High"];
const overlayClass = "fixed inset-0 z-50 flex items-center justify-center bg-[#211632]/45 p-4 backdrop-blur-sm";
const labelClass = "mb-1.5 block text-sm font-semibold text-[#0D062D]";
const fieldClass = "w-full rounded-xl border border-[#A89BC4] bg-white px-3.5 text-sm text-[#0D062D] outline-none transition placeholder:text-[#716588] focus:border-[#503681] focus:ring-2 focus:ring-[#E7DFF4]";
const primaryClass = "h-11 rounded-xl bg-[#503681] px-5 text-sm font-semibold text-white transition hover:bg-[#432C6D]";

const CreateTaskDialog = ({ open, onClose, onCreate }) => {
  const { projects, selectedProject } = useProject();
  const { setTasks } = useTasks();
  const dialogId = useId();

  const [selectedProjectId, setSelectedProjectId] = useState(0);

  useEffect(() => {
    if (selectedProject) {
      setSelectedProjectId(Number(selectedProject.id));
    } else if (projects.length) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProject]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProjectId) {
      alert("Please select a project");
      return;
    }

    const form = new FormData(e.target);

    const task = {
      title: form.get("title")?.trim(),
      description: form.get("description")?.trim(),
      status: form.get("status")?.trim().toLowerCase(),
      priority: form.get("priority")?.trim().toLowerCase(),
      projectId: selectedProjectId,
    };

    try {
      const createdTask = await createTask(task);

      setTasks((prev) =>
        prev.some(({ id }) => id === createdTask.id) ? prev : [...prev, createdTask],
      );

      onCreate?.(createdTask);

      e.target.reset();

      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task");
    }
  };

  if (!open) return null;

  if (projects.length === 0) {
    return (
      <div
        className={overlayClass}
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-[0_25px_80px_rgba(0,0,0,0.12)]"
        >
          <p className="text-lg font-semibold text-[#0D062D]">
            Please create a project
          </p>

          <p className="mt-2 text-sm text-[#787486]">
            You need at least one project before you can add tasks.
          </p>

          <button
            type="button"
            onClick={onClose}
            className={`mt-6 w-full ${primaryClass}`}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={overlayClass}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${dialogId}-heading`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full w-full max-w-[560px] overflow-y-auto rounded-3xl bg-white shadow-[0_24px_64px_rgba(26,15,44,0.28)]"
      >
        <div className="mx-5 flex items-center justify-between gap-4 border-b border-[#DDD5EB] py-5 sm:mx-7">
          <h2 id={`${dialogId}-heading`} className="text-2xl font-bold tracking-tight text-[#0D062D] sm:text-3xl">
            New Task
          </h2>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid size-9 shrink-0 place-items-center rounded-lg text-2xl leading-none text-[#503681] transition hover:bg-[#F1EBF8]"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-5 py-5 sm:px-7 sm:py-6">
            <div>
              <label htmlFor={`${dialogId}-title`} className={labelClass}>
                Title
              </label>

              <input
                id={`${dialogId}-title`}
                name="title"
                required
                placeholder="e.g. Design Profile Screen"
                className={`h-11 ${fieldClass}`}
              />
            </div>

            <div>
              <label htmlFor={`${dialogId}-description`} className={labelClass}>
                Description
              </label>

              <textarea
                id={`${dialogId}-description`}
                rows={3}
                name="description"
                placeholder="Add task description..."
                className={`min-h-24 resize-y py-3 ${fieldClass}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${dialogId}-status`} className={labelClass}>
                  Status
                </label>

                <select
                  id={`${dialogId}-status`}
                  name="status"
                  defaultValue="To Do"
                  className={`h-11 ${fieldClass}`}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={`${dialogId}-priority`} className={labelClass}>
                  Priority
                </label>

                <select
                  id={`${dialogId}-priority`}
                  name="priority"
                  defaultValue="High"
                  className={`h-11 ${fieldClass}`}
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor={`${dialogId}-project`} className={labelClass}>
                Project
              </label>

              <select
                id={`${dialogId}-project`}
                name="projectId"
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(Number(e.target.value))}
                className={`h-11 ${fieldClass}`}
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3 border-t border-[#DDD5EB] px-5 py-4 sm:px-7">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-[#79639C] bg-white px-5 text-sm font-semibold text-[#503681] transition hover:bg-[#F1EBF8]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className={primaryClass}
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskDialog;
