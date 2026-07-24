import { useCallback, useEffect, useMemo, useState } from "react";
import TasksGroup from "../components/TasksGroup";
import { fetchTasks } from "../units/network";

const GROUPS = [
  { title: "To Do", status: "to do" },
  { title: "On Progress", status: "on progress" },
  { title: "Done", status: "done" },
];

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [draggedTaskId, setDraggedTaskId] = useState(null);

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

      // Если нужно сохранять изменение статуса на backend
      try {
        await fetch(`http://localhost:3000/tasks/${draggedTaskId}`, {
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

  const tasksByStatus = useMemo(() => {
    return tasks.reduce(
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
  }, [tasks]);

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
