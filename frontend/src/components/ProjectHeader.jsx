import { useProject } from "../contexts/ProjectContext";
import TaskFilters from "./TaskFilters";

const ProjectHeader = ({ onNewTask, filters, onApplyFilters }) => {
  const { selectedProject } = useProject();

  return (
    <div className="flex items-center gap-3 p-8">
      <h1 className="min-w-0 break-words text-3xl font-bold text-[#0D062D]">
        {selectedProject?.title ?? "Tasks"}
      </h1>
      {onNewTask && (
        <div className="ml-auto flex shrink-0 items-center gap-3">
          <TaskFilters filters={filters} onApply={onApplyFilters} />
          <button
            type="button"
            onClick={onNewTask}
            className="inline-flex items-center gap-2 rounded-xl bg-[#5030E5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4123D7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5030E5] sm:px-5"
          >
            <span aria-hidden="true" className="text-xl leading-none">+</span>
            New Task
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectHeader;
