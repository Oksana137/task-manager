import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";

import TaskList from "../components/TaskList";
import TaskDetailsPanel from "../components/TaskDetailsPanel";
import NoProjects from "../components/NoProjects";
import NoTasks from "../components/NoTasks";
import ProjectHeader from "../components/ProjectHeader";

import { useTasks } from "../contexts/TasksContext";
import { useProject } from "../contexts/ProjectContext";
import { useProjectTasks } from "../hooks/useProjectTasks";
import { filterTasks } from "../units/taskDisplay";

const TaskListPage = () => {
  const { setTasks } = useTasks();
  const { projects, projectsLoaded } = useProject();
  const projectTasks = useProjectTasks();
  const { openCreateTask } = useOutletContext();
  const location = useLocation();

  const [filters, setFilters] = useState({ statuses: [], priorities: [] });
  const [selectedTaskId, setSelectedTaskId] = useState(location.state?.taskId);

  useEffect(() => {
    setSelectedTaskId(location.state?.taskId);
  }, [location.key, location.state?.taskId]);

  const filteredTasks = filterTasks(projectTasks, filters);
  const currentTask =
    filteredTasks.find((task) => task.id === selectedTaskId) ||
    filteredTasks[0];

  if (projectsLoaded && projects.length === 0) {
    return <NoProjects />;
  }

  if (projectTasks.length === 0) {
    return <NoTasks />;
  }

  return (
    <div className="flex h-full min-w-0 flex-col bg-white lg:absolute lg:inset-0">
      <ProjectHeader onNewTask={openCreateTask} filters={filters} onApplyFilters={setFilters} />

      {currentTask ? (
        <div className="grid flex-1 grid-cols-1 content-start gap-5 px-8 pb-8 lg:min-h-0 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:grid-rows-[minmax(0,1fr)] lg:content-stretch">
          <TaskList
            tasks={filteredTasks}
            currentTask={currentTask}
            setCurrentTask={(task) => setSelectedTaskId(task.id)}
          />
          <TaskDetailsPanel key={currentTask.id} task={currentTask} setTasks={setTasks} />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center px-8 pb-8">
          <p role="status" className="rounded-3xl border border-dashed border-[#E5E5E5] p-10 text-center text-lg font-medium text-[#0D062D]">
            No tasks match these filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskListPage;
