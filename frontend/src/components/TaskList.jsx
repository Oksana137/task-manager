import { statusColors, statusNames } from "../units/taskDisplay";

const TaskList = ({ tasks, currentTask, setCurrentTask }) => {
  return (
    <div className="min-w-0 space-y-3 lg:min-h-0 lg:overflow-y-auto">
      {tasks.map((task) => (
        <button
          key={task.id}
          type="button"
          aria-pressed={currentTask?.id === task.id}
          onClick={() => setCurrentTask(task)}
          className={`w-full rounded-2xl border p-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5030E5] ${
            currentTask?.id === task.id
              ? "border-[#5030E5] bg-[#F1EEFC]"
              : "border-[#ECECEC] bg-white hover:border-[#B8A8F2]"
          }`}
        >
          <h3 className="break-words text-lg font-semibold text-[#0D062D]">
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 line-clamp-2 break-words text-sm text-[#787486]">
              {task.description}
            </p>
          )}
          <span
            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
              statusColors[task.status]
            }`}
          >
            {statusNames[task.status]}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TaskList;
