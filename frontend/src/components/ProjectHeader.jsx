import { useProject } from "../contexts/ProjectContext";

const ProjectHeader = ({ onNewTask }) => {
  const { selectedProject } = useProject();

  return (
    <div className="flex items-center gap-3 p-8">
      <h1 className="min-w-0 break-words text-3xl font-bold text-[#0D062D]">
        {selectedProject?.title ?? "Tasks"}
      </h1>
      {onNewTask && (
        <div className="ml-auto flex shrink-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#D7D4E6] bg-white px-4 text-sm font-semibold text-[#0D062D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5030E5]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M3 4h18l-7 8v7l-4 2v-9L3 4Z" />
            </svg>
            Filters
          </button>
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
