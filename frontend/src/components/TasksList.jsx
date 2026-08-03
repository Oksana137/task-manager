import { useEffect, useState } from "react";

import CreateTask from "./CreateTask";

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

const TasksList = ({ tasks, currentTask, setCurrentTask }) => {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

  useEffect(() => {
    if (tasks.length === 0) {
      return;
    }

    const exists = tasks.some((task) => task.id === currentTask?.id);

    if (!exists) {
      setCurrentTask(tasks[0]);
    }
  }, [tasks, currentTask, setCurrentTask]);

  const handleCreateTask = (task) => {
    setCurrentTask(task);
    setIsCreateTaskOpen(false);
  };

  return (
    <div className="flex h-full w-full flex-col border-r border-[#E8E8E8] p-8">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-[#0D062D]">Tasks</h1>

          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEEAFD] text-sm font-semibold text-[#625F6D]">
            {tasks.length}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateTaskOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-[#5030E5] px-5 py-3 text-white transition hover:bg-[#4123D7]"
        >
          <span className="text-lg">+</span>
          Create Task
        </button>
      </div>

      {/* Tasks */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            onClick={() => setCurrentTask(task)}
            className={`w-full rounded-2xl border bg-white p-6 text-left transition-all ${
              currentTask?.id === task.id
                ? "border-[#5030E5] shadow-md"
                : "border-[#ECECEC] hover:border-[#5030E5] hover:shadow"
            }`}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-[#0D062D]">
                {task.title}
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  statusColors[task.status]
                }`}
              >
                {statusNames[task.status]}
              </span>
            </div>

            <p className="mt-3 line-clamp-2 text-sm text-[#787486]">
              {task.description}
            </p>
          </button>
        ))}
      </div>

      <CreateTask
        open={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
};

export default TasksList;
