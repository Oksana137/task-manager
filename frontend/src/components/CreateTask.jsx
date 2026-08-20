import { useEffect, useState } from "react";
import { fetchProjects, createTask } from "../units/network";
import { useProject } from "../contexts/ProjectContext";
import { useTasks } from "../contexts/TasksContext";

const statuses = ["To Do", "On Progress", "Done"];
const priorities = ["Low", "High"];

const CreateTask = ({ open, onClose, onCreate }) => {
  const { selectedProject } = useProject();
  const { setTasks } = useTasks();

  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchProjects({ signal: controller.signal })
      .then((data) => {
        setProjects(data);

        if (data.length && !selectedProject) {
          setSelectedProjectId(data[0].id);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching projects:", error);
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      setSelectedProjectId(Number(selectedProject.id));
    }
  }, [selectedProject]);

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

      setTasks((prev) => [...prev, createdTask]);

      onCreate?.(createdTask);

      e.target.reset();

      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[590px] rounded-3xl bg-white px-10 py-8 shadow-[0_25px_80px_rgba(0,0,0,0.12)]"
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#0D062D]">
            Add New Task
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-[30px] leading-none text-gray-400 transition hover:text-gray-600"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#787486]">
              Title
            </label>

            <input
              name="title"
              required
              placeholder="e.g. Design Profile Screen"
              className="h-12 w-full rounded-xl border border-[#E5E5E5] px-4 text-[15px] text-[#0D062D] placeholder:text-gray-400 outline-none transition focus:border-[#5030E5]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#787486]">
              Description
            </label>

            <textarea
              rows={3}
              name="description"
              placeholder="Add task description..."
              className="w-full resize-none rounded-xl border border-[#E5E5E5] p-4 text-[15px] text-[#0D062D] placeholder:text-gray-400 outline-none transition focus:border-[#5030E5]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-[14px] font-medium text-[#787486]">
                Status
              </label>

              <select
                name="status"
                defaultValue="To Do"
                className="h-12 w-full rounded-xl border border-[#E5E5E5] bg-white px-4 text-[15px] text-[#0D062D] outline-none transition focus:border-[#5030E5]"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-[14px] font-medium text-[#787486]">
                Priority
              </label>

              <select
                name="priority"
                defaultValue="High"
                className="h-12 w-full rounded-xl border border-[#E5E5E5] bg-white px-4 text-[15px] text-[#0D062D] outline-none transition focus:border-[#5030E5]"
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
            <label className="mb-2 block text-[14px] font-medium text-[#787486]">
              Project
            </label>

            <select
              name="projectId"
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(Number(e.target.value))}
              disabled={!projects.length}
              className="h-12 w-full rounded-xl border border-[#E5E5E5] bg-white px-4 text-[15px] text-[#0D062D] outline-none transition focus:border-[#5030E5]"
            >
              {!projects.length && <option value={0}>No projects</option>}

              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-[#E5E5E5] bg-white px-6 text-[15px] font-medium text-[#787486] transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-11 rounded-xl bg-[#5030E5] px-6 text-[15px] font-medium text-white transition hover:bg-[#4123D7]"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
