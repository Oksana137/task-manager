import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import TasksList from "../components/TasksList";
import TaskDetail from "../components/TaskDetail";
import NoProjects from "../components/NoProjects";
import NoTasks from "../components/NoTasks";
import TasksHeader from "../components/TasksHeader";

import { useTasks } from "../contexts/TasksContext";
import { useProject } from "../contexts/ProjectContext";
import { useProjectTasks } from "../hooks/useProjectTasks";

const TasksPage = () => {
  const { tasks, setTasks } = useTasks();
  const { projects, projectsLoaded } = useProject();
  const filteredTasks = useProjectTasks();
  const location = useLocation();

  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const taskId = location.state?.taskId;

    if (!taskId) return;

    const task = tasks.find((t) => t.id === taskId);

    if (task) setSelectedTask(task);
  }, [location.state, tasks]);

  const currentTask =
    filteredTasks.find((task) => task.id === selectedTask?.id) ||
    filteredTasks[0];

  if (projectsLoaded && projects.length === 0) {
    return <NoProjects />;
  }

  if (filteredTasks.length === 0) {
    return <NoTasks />;
  }

  return (
    <div className="flex h-full flex-col bg-[#F8F9FD]">
      <TasksHeader count={filteredTasks.length} />

      <div className="mt-6 flex flex-1 overflow-hidden">
        <div className="w-1/2">
          <TasksList
            tasks={filteredTasks}
            currentTask={currentTask}
            setCurrentTask={setSelectedTask}
            setTasks={setTasks}
          />
        </div>

        <div className="w-1/2">
          <TaskDetail task={currentTask} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
