import { memo } from "react";

const getBadge = ({ status, priority }) => {
  if (status === "done") {
    return {
      text: "Completed",
      textColor: "#68B266",
      bgColor: "rgba(104,178,102,0.2)",
    };
  }

  if (priority === "high") {
    return {
      text: "High",
      textColor: "#D8727D",
      bgColor: "rgba(216,114,125,0.1)",
    };
  }

  return {
    text: "Low",
    textColor: "#D58D49",
    bgColor: "rgba(213,141,73,0.2)",
  };
};

const Task = ({ task, onDragStart }) => {
  const badge = getBadge(task);

  return (
    <article
      draggable
      onDragStart={() => onDragStart(task.id)}
      className="
        cursor-move
        rounded-2xl
        bg-white
        p-5
        shadow-sm
        transition
        hover:shadow-md
      "
    >
      <div className="mb-3">
        <span
          className="rounded px-2 py-1 text-xs font-medium"
          style={{
            color: badge.textColor,
            backgroundColor: badge.bgColor,
          }}
        >
          {badge.text}
        </span>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-[#0D062D]">
        {task.title}
      </h3>

      <p className="text-sm text-[#787486]">{task.description}</p>
    </article>
  );
};

export default memo(Task);
