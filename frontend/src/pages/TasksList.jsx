import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import TasksList from "../components/TasksList";
import TaskDetail from "../components/TaskDetail";

import { useProject } from "../contexts/ProjectContext";
import { useTasks } from "../contexts/TasksContext";

const TasksPage = () => {
  const { tasks, setTasks } = useTasks();
  const { selectedProject } = useProject();
  const location = useLocation();

  const filteredTasks = useMemo(() => {
    if (!selectedProject) return [];

    return tasks.filter((task) => task.projectId === selectedProject.id);
  }, [tasks, selectedProject]);

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

  return (
    <div className="flex h-full bg-[#F8F9FD]">
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
  );
};

export default TasksPage;
