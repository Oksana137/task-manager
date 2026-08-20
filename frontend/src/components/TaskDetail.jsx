import { useEffect, useState } from "react";

import messages from "../icons/messages.svg";
import { statusColors, statusDots, statusNames } from "../units/taskDisplay";

const TaskDetail = ({ task, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "to do",
    priority: "low",
    projectId: null,
  });

  useEffect(() => {
    if (!task) return;

    setForm({
      title: task.title ?? "",
      description: task.description ?? "",
      status: task.status ?? "to do",
      priority: task.priority ?? "low",
      projectId: task.projectId ?? task.project?.id ?? null,
    });

    setIsEditing(false);
  }, [task]);

  if (!task) {
    return (
      <div className="flex flex-1 items-center justify-center px-2 pb-2">
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-[#E5E5E5] bg-white text-gray-400">
          <p className="text-lg font-medium">No task selected</p>
          <p className="text-sm">Choose a task from the list to view it</p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setForm({
      title: task.title ?? "",
      description: task.description ?? "",
      status: task.status ?? "to do",
      priority: task.priority ?? "low",
      projectId: task.projectId ?? task.project?.id ?? null,
    });

    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${task.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
      );

      setForm({
        title: updatedTask.title ?? "",
        description: updatedTask.description ?? "",
        status: updatedTask.status ?? "to do",
        priority: updatedTask.priority ?? "low",
        projectId: updatedTask.projectId ?? updatedTask.project?.id ?? null,
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 px-2 pb-2">
      <div className="flex h-full flex-col overflow-y-auto rounded-3xl border border-[#ECECEC] bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                  statusColors[form.status]
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${statusDots[form.status]}`}
                />
                {statusNames[form.status]}
              </span>
            </div>

            {isEditing ? (
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E5E5E5] p-2 text-3xl font-bold text-[#0D062D] outline-none focus:border-[#5030E5]"
              />
            ) : (
              <h2 className="break-words text-3xl font-bold text-[#0D062D]">
                {task.title}
              </h2>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-xl border border-[#E5E5E5] px-5 py-2 font-medium text-[#0D062D] transition hover:border-[#5030E5] hover:text-[#5030E5]"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="rounded-xl border border-[#E5E5E5] px-5 py-2 font-medium text-[#0D062D] transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="rounded-xl bg-[#5030E5] px-5 py-2 font-medium text-white transition hover:bg-[#4123D7] disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-8 border-b border-[#ECECEC] pb-8">
          <p className="mb-2 text-sm font-semibold text-[#787486]">
            Description
          </p>

          {isEditing ? (
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-xl border border-[#E5E5E5] p-3 outline-none focus:border-[#5030E5]"
            />
          ) : (
            <p className="rounded-xl bg-[#F8F9FD] p-4 leading-7 text-[#787486]">
              {task.description || "No description"}
            </p>
          )}
        </div>

        {/* Status & Priority */}
        <div className="mt-8 grid grid-cols-2 gap-8 border-b border-[#ECECEC] pb-8">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#787486]">Status</p>

            {isEditing ? (
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E5E5E5] px-4 py-3 outline-none focus:border-[#5030E5]"
              >
                <option value="to do">To Do</option>
                <option value="on progress">On Progress</option>
                <option value="done">Completed</option>
              </select>
            ) : (
              <div className="flex items-center gap-2 rounded-xl border border-[#E5E5E5] px-4 py-3">
                <span
                  className={`h-2 w-2 rounded-full ${statusDots[task.status]}`}
                />
                {statusNames[task.status]}
              </div>
            )}
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-[#787486]">
              Priority
            </p>

            {isEditing ? (
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E5E5E5] px-4 py-3 outline-none focus:border-[#5030E5]"
              >
                <option value="low">Low</option>
                <option value="high">High</option>
              </select>
            ) : (
              <div className="rounded-xl border border-[#E5E5E5] px-4 py-3 capitalize">
                {task.priority}
              </div>
            )}
          </div>
        </div>

        {/* Meta */}
        <div className="mt-6 flex items-center gap-2 text-sm text-[#787486]">
          <img src={messages} alt="comments" className="h-4 w-4 opacity-70" />
          {task.commentsNumber ?? 0} comments
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;