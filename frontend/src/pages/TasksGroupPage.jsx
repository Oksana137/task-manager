import { useCallback, useMemo, useState } from "react";

import TasksGroup from "../components/TasksGroup";
import NoProjects from "../components/NoProjects";
import NoTasks from "../components/NoTasks";
import TasksHeader from "../components/TasksHeader";

import { useTasks } from "../contexts/TasksContext";
import { useProject } from "../contexts/ProjectContext";
import { useProjectTasks } from "../hooks/useProjectTasks";
import { updateTask } from "../units/network";

const GROUPS = [
  { title: "To Do", status: "to do" },
  { title: "On Progress", status: "on progress" },
  { title: "Done", status: "done" },
];

const TasksGroupPage = () => {
  const { setTasks } = useTasks();
  const { projects, projectsLoaded } = useProject();
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
        await updateTask(draggedTaskId, { status });
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

  if (projectsLoaded && projects.length === 0) {
    return <NoProjects />;
  }

  if (filteredTasks.length === 0) {
    return <NoTasks />;
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-[#F8F9FD]">
      <TasksHeader count={filteredTasks.length} />

      <div className="mt-6 flex-1 px-8 pb-8">
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
    </div>
  );
};

export default TasksGroupPage;
