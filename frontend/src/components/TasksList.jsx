import { useEffect } from "react";

import { statusColors, statusNames } from "../units/taskDisplay";

const TasksList = ({ tasks, currentTask, setCurrentTask }) => {
  useEffect(() => {
    if (tasks.length === 0) {
      return;
    }

    const exists = tasks.some((task) => task.id === currentTask?.id);

    if (!exists) {
      setCurrentTask(tasks[0]);
    }
  }, [tasks, currentTask, setCurrentTask]);

  return (
    <div className="flex h-full w-full flex-col p-6">
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
    </div>
  );
};

export default TasksList;
