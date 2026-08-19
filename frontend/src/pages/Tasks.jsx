import { useCallback, useMemo, useState } from "react";

import TasksGroup from "../components/TasksGroup";
import { useTasks } from "../contexts/TasksContext";
import { useProjectTasks } from "../hooks/useProjectTasks";

const GROUPS = [
  { title: "To Do", status: "to do" },
  { title: "On Progress", status: "on progress" },
  { title: "Done", status: "done" },
];

const Tasks = () => {
  const { setTasks } = useTasks();
  const filteredTasks = useProjectTasks();

  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const handleDragStart = useCallback((taskId) => {
    setDraggedTaskId(taskId);
  }, []);

  const handleDrop = useCallback(
    async (status) => {
      if (!draggedTaskId) return;

      setTasks((prev) =>
        prev.map((task) =>
          task.id === draggedTaskId ? { ...task, status } : task,
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
    [draggedTaskId, setTasks],
  );

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
