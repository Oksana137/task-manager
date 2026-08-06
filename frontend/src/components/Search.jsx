import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import search from "../icons/search.svg";
import { useTasks } from "../contexts/TasksContext";
import { useProject } from "../contexts/ProjectContext";

const Search = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();
  const { tasks } = useTasks();
  const { selectedProject } = useProject();

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) return [];

    return tasks.filter((task) => {
      if (selectedProject && task.projectId !== selectedProject.id) {
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
      <div className="flex items-center gap-4 h-[44px] pl-8 pr-28 border rounded-lg bg-[#F5F5F5]">
        <img src={search} alt="search" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          placeholder="Search for anything ..."
          className="w-full outline-none bg-transparent"
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

export default Search;