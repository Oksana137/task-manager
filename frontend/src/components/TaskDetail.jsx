import { useEffect, useState } from "react";

const statusColors = {
  "to do": "bg-red-100 text-red-600",
  "on progress": "bg-yellow-100 text-yellow-600",
  done: "bg-green-100 text-green-600",
};

const statusNames = {
  "to do": "To Do",
  "on progress": "On Progress",
  done: "Completed",
};

const TaskDetail = ({ task, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);

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
      <div className="flex flex-1 items-center justify-center p-2">
        <div className="flex h-full w-full items-center justify-center rounded-3xl border border-[#ECECEC] bg-white text-gray-400">
          Select task
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

  const handleSave = async () => {
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
    }
  };

  return (
    <div className="flex-1 p-2">
      <div className="flex h-full flex-col rounded-3xl border border-[#ECECEC] bg-white p-8">
        <div className="flex items-start justify-between">
          <div>
            <span
              className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                statusColors[form.status]
              }`}
            >
              {statusNames[form.status]}
            </span>

            {isEditing ? (
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E5E5E5] p-2 text-3xl font-bold"
              />
            ) : (
              <h2 className="text-3xl font-bold text-[#0D062D]">
                {task.title}
              </h2>
            )}
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-xl border border-[#E5E5E5] px-5 py-2 transition hover:bg-gray-50"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="rounded-xl border border-[#E5E5E5] px-5 py-2 transition hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>

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
              className="w-full rounded-xl border border-[#E5E5E5] p-3"
            />
          ) : (
            <p className="leading-7 text-[#787486]">
              {task.description || "No description"}
            </p>
          )}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8 border-b border-[#ECECEC] pb-8">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#787486]">Status</p>

            {isEditing ? (
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E5E5E5] px-4 py-3"
              >
                <option value="to do">To Do</option>
                <option value="on progress">On Progress</option>
                <option value="done">Completed</option>
              </select>
            ) : (
              <div className="rounded-xl border border-[#E5E5E5] px-4 py-3">
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
                className="w-full rounded-xl border border-[#E5E5E5] px-4 py-3"
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

        {isEditing && (
          <div className="mt-8">
            <button
              onClick={handleSave}
              className="w-full rounded-xl bg-[#5030E5] py-3 font-medium text-white transition hover:bg-[#4123D7]"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
