import { useCallback, useMemo, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import TaskColumn from "../components/TaskColumn";
import NoProjects from "../components/NoProjects";
import NoTasks from "../components/NoTasks";
import ProjectHeader from "../components/ProjectHeader";

import { useTasks } from "../contexts/TasksContext";
import { useProject } from "../contexts/ProjectContext";
import { useProjectTasks } from "../hooks/useProjectTasks";
import { updateTask } from "../units/network";
import { filterTasks } from "../units/taskDisplay";

const GROUPS = [
  { title: "To Do", status: "to do" },
  { title: "On Progress", status: "on progress" },
  { title: "Done", status: "done" },
];

const TaskBoardPage = () => {
  const { openCreateTask } = useOutletContext();
  const { setTasks } = useTasks();
  const { projects, projectsLoaded } = useProject();
  const projectTasks = useProjectTasks();
  const [filters, setFilters] = useState({ statuses: [], priorities: [] });

  const draggedTaskId = useRef(null);
  const pendingMoves = useRef(new Set());
  const [moveError, setMoveError] = useState("");

  const handleDragStart = useCallback((taskId) => {
    draggedTaskId.current = taskId;
  }, []);

  const handleDrop = useCallback(
    async (status) => {
      const taskId = draggedTaskId.current;
      draggedTaskId.current = null;
      const task = projectTasks.find(({ id }) => id === taskId);
      if (!task || task.status === status || pendingMoves.current.has(taskId)) return;

      pendingMoves.current.add(taskId);
      setMoveError("");
      try {
        const updatedTask = await updateTask(taskId, { status });
        setTasks((prev) =>
          prev.map((item) =>
            item.id === taskId ? { ...item, status: updatedTask.status } : item,
          ),
        );
      } catch (error) {
        console.error("Failed to update task:", error);
        setMoveError("Could not move the task. Please try again.");
      } finally {
        pendingMoves.current.delete(taskId);
      }
    },
    [projectTasks, setTasks],
  );

  const visibleTasks = useMemo(() => filterTasks(projectTasks, filters), [filters, projectTasks]);

  const tasksByStatus = useMemo(() => {
    return visibleTasks.reduce(
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
  }, [visibleTasks]);

  if (projectsLoaded && projects.length === 0) {
    return <NoProjects />;
  }

  if (projectTasks.length === 0) {
    return <NoTasks />;
  }

  const hasNoMatches = visibleTasks.length === 0;

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <ProjectHeader
        onNewTask={openCreateTask}
        filters={filters}
        onApplyFilters={setFilters}
      />

      <div className="mt-6 flex flex-1 flex-col px-8 pb-8">
        {moveError && (
          <p role="alert" className="mb-4 text-sm text-red-600">
            {moveError}
          </p>
        )}
        <div className={`grid grid-cols-3 gap-8 ${hasNoMatches ? "[&>section]:min-h-0" : ""}`}>
          {GROUPS.map((group) => (
            <TaskColumn
              key={group.status}
              {...group}
              tasks={tasksByStatus[group.status]}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
        {hasNoMatches && (
          <div className="flex flex-1 items-center justify-center py-6">
            <p
              role="status"
              className="max-w-sm rounded-3xl border border-dashed border-[#E5E5E5] bg-white p-10 text-center text-lg font-medium text-[#0D062D]"
            >
              No tasks match these filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskBoardPage;
