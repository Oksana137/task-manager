import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import TaskList from "../components/TaskList";
import TaskDetailsPanel from "../components/TaskDetailsPanel";
import NoProjects from "../components/NoProjects";
import NoTasks from "../components/NoTasks";
import ProjectHeader from "../components/ProjectHeader";

import { useTasks } from "../contexts/TasksContext";
import { useProject } from "../contexts/ProjectContext";
import { useProjectTasks } from "../hooks/useProjectTasks";

const TaskListPage = () => {
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
    <div className="flex h-full flex-col">
      <ProjectHeader />

      <div className="mt-6 flex flex-1 overflow-hidden">
        <div className="w-1/2">
          <TaskList
            tasks={filteredTasks}
            currentTask={currentTask}
            setCurrentTask={setSelectedTask}
            setTasks={setTasks}
          />
        </div>

        <div className="w-1/2">
          <TaskDetailsPanel task={currentTask} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;
