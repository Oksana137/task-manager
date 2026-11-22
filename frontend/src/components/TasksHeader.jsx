import { useProject } from "../contexts/ProjectContext";

const TasksHeader = () => {
  const { selectedProject } = useProject();

  return (
    <div className="flex items-center gap-3 p-8">
      <h1 className="min-w-0 break-words text-3xl font-bold text-[#0D062D]">
        {selectedProject?.title ?? "Tasks"}
      </h1>
    </div>
  );
};

export default TasksHeader;
