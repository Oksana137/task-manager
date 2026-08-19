import { useMemo } from "react";

import { useProject } from "../contexts/ProjectContext";
import { useTasks } from "../contexts/TasksContext";

export const useProjectTasks = () => {
  const { tasks } = useTasks();
  const { selectedProject } = useProject();

  return useMemo(() => {
    if (!selectedProject) return [];

    return tasks.filter((task) => task.projectId === selectedProject.id);
  }, [tasks, selectedProject]);
};
