import { useProject } from "../contexts/ProjectContext";
import TaskFilters from "./TaskFilters";

const ProjectHeader = ({ onNewTask, filters, onApplyFilters }) => {
  const { selectedProject } = useProject();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-4 pb-10 pt-8 lg:px-8">
      <h1 className="min-w-0 break-words text-3xl font-bold tracking-tight text-[#0D062D] xl:text-4xl">
        {selectedProject?.title ?? "Tasks"}
      </h1>
      {onNewTask && (
        <div className="ml-auto flex flex-wrap items-center justify-end gap-3">
          <TaskFilters filters={filters} onApply={onApplyFilters} />
          <button
            type="button"
            onClick={onNewTask}
            className="inline-flex items-center gap-2 rounded-xl bg-[#503681] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#432C6D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#503681] sm:px-5"
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
