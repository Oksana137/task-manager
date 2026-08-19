import { memo } from "react";

import messages from "../icons/messages.svg";
import { getTaskBadge } from "../units/taskDisplay";

const Task = ({ task, onDragStart }) => {
  const badge = getTaskBadge(task);

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
      {/* Badge */}
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

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-[#0D062D]">
        {task.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#787486]">{task.description}</p>

      {/* Meta */}
      <div className="mt-8 flex items-center justify-end gap-2 text-sm text-[#787486]">
        <img src={messages} alt="comments" className="h-4 w-4 opacity-70" />
        {task.commentsNumber ?? 0} comments
      </div>
    </article>
  );
};

export default memo(Task);
