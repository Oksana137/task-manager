import { useCallback, useEffect, useMemo, useState } from "react";

import TasksGroup from "../components/TasksGroup";
import { useProject } from "../contexts/ProjectContext";
import { fetchTasks } from "../units/network";

const GROUPS = [
  { title: "To Do", status: "to do" },
  { title: "On Progress", status: "on progress" },
  { title: "Done", status: "done" },
];

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const { selectedProject } = useProject();

  useEffect(() => {
    const controller = new AbortController();

    fetchTasks({ signal: controller.signal })
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error.message));

    return () => controller.abort();
  }, []);

  const handleDragStart = useCallback((taskId) => {
    setDraggedTaskId(taskId);
  }, []);

  const handleDrop = useCallback(
    async (status) => {
      if (!draggedTaskId) return;

      setTasks((prev) =>
        prev.map((task) =>
          task.id === draggedTaskId
            ? {
                ...task,
                status,
              }
            : task,
        ),
      );

      try {
        await fetch(`${import.meta.env.VITE_API_URL}/tasks/${draggedTaskId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        });
      } catch (error) {
        console.error("Failed to update task:", error);
      }

      setDraggedTaskId(null);
    },
    [draggedTaskId],
  );

  const filteredTasks = useMemo(() => {
    if (!selectedProject) return [];

    return tasks.filter((task) => task.projectId === selectedProject.id);
  }, [tasks, selectedProject]);

  const tasksByStatus = useMemo(() => {
    return filteredTasks.reduce(
      (acc, task) => {
        acc[task.status].push(task);
        return acc;
      },
      {
        "to do": [],
        "on progress": [],
        done: [],
      },
    );
  }, [filteredTasks]);

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {GROUPS.map((group) => (
        <TasksGroup
          key={group.status}
          {...group}
          tasks={tasksByStatus[group.status]}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
        />
      ))}
    </div>
  );
};

export default Tasks;
