import { useOutletContext } from "react-router-dom";
import { useProject } from "../contexts/ProjectContext";

const NoTasks = () => {
  const { openCreateTask } = useOutletContext();
  const { selectedProject } = useProject();

  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F8F9FD] p-6">
      <div className="flex max-w-sm flex-col items-center gap-2 rounded-3xl border border-dashed border-[#E5E5E5] bg-white p-10 text-center text-gray-400">
        <p className="text-lg font-medium text-[#0D062D]">No tasks yet</p>
        <p className="text-sm">Create a task to get started</p>
        {selectedProject && (
          <button
            type="button"
            onClick={openCreateTask}
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#5030E5] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#4123D7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5030E5]"
          >
            <span aria-hidden="true" className="text-xl leading-none">+</span>
            Add task
          </button>
        )}
      </div>
    </div>
  );
};

export default NoTasks;
