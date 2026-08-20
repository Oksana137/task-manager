import { useCallback, useMemo, useState } from "react";

import TasksGroup from "../components/TasksGroup";
import { useTasks } from "../contexts/TasksContext";
import { useProjectTasks } from "../hooks/useProjectTasks";

const GROUPS = [
  { title: "To Do", status: "to do" },
  { title: "On Progress", status: "on progress" },
  { title: "Done", status: "done" },
];

const TasksGroupPage = () => {
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
    <div className="h-full overflow-y-auto bg-[#F8F9FD] p-6">
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-3xl font-bold text-[#0D062D]">Tasks</h1>

        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEEAFD] text-sm font-semibold text-[#625F6D]">
          {filteredTasks.length}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
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
    </div>
  );
};

export default TasksGroupPage;
