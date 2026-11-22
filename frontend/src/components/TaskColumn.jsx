import addSquare from "../icons/add_square.svg";
import TaskCard from "./TaskCard";
import CreateTaskDialog from "./CreateTaskDialog";
import { useState } from "react";

const BORDER_COLORS = {
  "To Do": "#5030E5",
  "On Progress": "#FFA500",
  Done: "#8BC48A",
};

const TaskColumn = ({ title, status, tasks, onDrop, onDragStart }) => {

  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <section
      onDragOver={handleDragOver}
      onDrop={() => onDrop(status)}
      className="min-h-28 min-w-0 lg:min-h-[600px]"
    >
      {/* Header */}
      <header
        className="flex min-h-11 items-center justify-between gap-2 border-b-[3px] px-2 pb-3"
        style={{
          borderColor: BORDER_COLORS[title],
        }}
      >
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="size-3 shrink-0 rounded-full" style={{ backgroundColor: BORDER_COLORS[title] }} />
          <h2 className="text-lg font-semibold text-[#0D062D]">{title}</h2>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {title === "To Do" && (
            <button
              type="button"
              onClick={() => setIsCreateTaskOpen(true)}
              className="rounded-md p-1 transition hover:bg-gray-100"
            >
              <img src={addSquare} alt="Add task" />
            </button>
          )}
          <span className="grid min-w-6 place-items-center rounded-lg bg-[#EEEDF2] px-1.5 py-0.5 text-xs font-semibold text-[#0D062D]">
            {tasks.length}
          </span>
        </div>

        <CreateTaskDialog
          open={isCreateTaskOpen}
          onClose={() => setIsCreateTaskOpen(false)}
        />
      </header>

      {/* Tasks */}
      <div className="mt-3 flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
        ))}
      </div>
    </section>
  );
};

export default TaskColumn;
