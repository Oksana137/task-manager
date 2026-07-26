import addSquare from "../icons/add_square.svg";
import Task from "./Task";
import AddTask from "./AddTask";
import { useState } from "react";

const BORDER_COLORS = {
  "To Do": "#5030E5",
  "On Progress": "#FFA500",
  Done: "#8BC48A",
};

const TasksGroup = ({ title, status, tasks, onDrop, onDragStart }) => {

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <section
      onDragOver={handleDragOver}
      onDrop={() => onDrop(status)}
      className="min-h-[600px] rounded-2xl bg-[#F5F5F5] p-4"
    >
      <header
        className="flex items-center justify-between border-b-[3px] pb-4"
        style={{
          borderColor: BORDER_COLORS[title],
        }}
      >
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-[#0D062D]">{title}</h2>

          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E0E0E0] text-xs text-[#625F6D]">
            {tasks.length}
          </div>
        </div>

        {title === "To Do" && (
          <button
            type="button"
            onClick={() => setIsAddTaskOpen(true)}
            className="rounded-md p-1 transition hover:bg-gray-100"
          >
            <img src={addSquare} alt="Add task" />
          </button>
        )}

        <AddTask
          open={isAddTaskOpen}
          onClose={() => setIsAddTaskOpen(false)}
          onCreate={(task) => {
            console.log(task);

            // здесь можно добавить задачу в state
            // addTask(task);
          }}
        />
      </header>

      <div className="mt-5 flex flex-col gap-4">
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDragStart={onDragStart} />
        ))}
      </div>
    </section>
  );
};

export default TasksGroup;
