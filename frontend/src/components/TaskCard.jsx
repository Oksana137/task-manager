import { memo } from "react";

import { getTaskBadge } from "../units/taskDisplay";

const TaskCard = ({ task, onDragStart }) => {
  const badge = getTaskBadge(task);

  return (
    <article
      draggable
      onDragStart={() => onDragStart(task.id)}
      className="
        cursor-move
        rounded-2xl
        border
        border-[#DDD7EB]
        bg-white
        p-5
        transition
        hover:shadow-md
      "
    >
      <h3 className="break-words text-lg font-semibold leading-snug text-[#0D062D]">
        {task.title}
      </h3>

      {task.description && (
        <p className="mt-2 break-words text-sm leading-relaxed text-[#514766]">
          {task.description}
        </p>
      )}

      <div className="mt-3">
        <span
          className="inline-flex rounded-full px-3 py-1 text-xs font-medium"
          style={{
            color: badge.textColor,
            backgroundColor: badge.bgColor,
          }}
        >
          {badge.text}
        </span>
      </div>
    </article>
  );
};

export default memo(TaskCard);
