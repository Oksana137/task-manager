import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import search from "../icons/search.svg";
import { useTasks } from "../contexts/TasksContext";
import { useProject } from "../contexts/ProjectContext";

const TaskSearch = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();
  const { tasks } = useTasks();
  const { selectedProject } = useProject();

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term || !selectedProject) return [];

    return tasks.filter((task) => {
      if (task.projectId !== selectedProject.id) {
        return false;
      }

      return (
        task.title?.toLowerCase().includes(term) ||
        task.description?.toLowerCase().includes(term)
      );
    });
  }, [tasks, selectedProject, query]);

  const isOpen = isFocused && query.trim().length > 0;

  const handleSelect = (task) => {
    setQuery("");
    setIsFocused(false);
    navigate("/tasks-list", { state: { taskId: task.id } });
  };

  return (
    <div className="relative w-full">
      <div className="flex h-11 items-center gap-3 rounded-xl border border-[#716090] bg-white px-4 focus-within:ring-2 focus-within:ring-[#DCD3EE]">
        <img src={search} alt="" className="size-5 shrink-0" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          aria-label="Search tasks"
          placeholder="Search tasks..."
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#0D062D] outline-none placeholder:text-[#514766]"
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 max-h-80 overflow-y-auto rounded-lg border border-[#ECECEC] bg-white shadow-lg">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-[#787486]">
              No tasks found
            </p>
          ) : (
            results.map((task) => (
              <button
                key={task.id}
                type="button"
                onMouseDown={() => handleSelect(task)}
                className="block w-full border-b border-[#ECECEC] px-4 py-3 text-left last:border-b-0 hover:bg-[#F5F5F5]"
              >
                <p className="text-sm font-semibold text-[#0D062D]">
                  {task.title}
                </p>

                <p className="mt-1 line-clamp-1 text-xs text-[#787486]">
                  {task.description}
                </p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TaskSearch;
