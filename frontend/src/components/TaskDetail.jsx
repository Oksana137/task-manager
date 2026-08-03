const statusColors = {
  "to do": "bg-red-100 text-red-600",
  "on progress": "bg-yellow-100 text-yellow-600",
  done: "bg-green-100 text-green-600",
};

const statusNames = {
  "to do": "To Do",
  "on progress": "On Progress",
  done: "Completed",
};

const TaskDetail = ({ task }) => {
  if (!task) {
    return (
      <div className="flex flex-1 items-center justify-center p-2">
        <div className="flex h-full w-full items-center justify-center rounded-3xl border border-[#ECECEC] bg-white text-gray-400">
          Select task
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-2">
      <div className="flex h-full flex-col rounded-3xl border border-[#ECECEC] bg-white p-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span
              className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                statusColors[task.status]
              }`}
            >
              {statusNames[task.status]}
            </span>

            <h2 className="text-3xl font-bold text-[#0D062D]">{task.title}</h2>
          </div>

          <button className="rounded-xl border border-[#E5E5E5] px-5 py-2 transition hover:bg-gray-50">
            Edit
          </button>
        </div>

        {/* Description */}
        <div className="mt-8 border-b border-[#ECECEC] pb-8">
          <p className="mb-2 text-sm font-semibold text-[#787486]">
            Description
          </p>

          <p className="leading-7 text-[#787486]">
            {task.description || "No description"}
          </p>
        </div>

        {/* Info */}
        <div className="mt-8 grid grid-cols-2 gap-8 border-b border-[#ECECEC] pb-8">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#787486]">Status</p>

            <div className="inline-flex rounded-xl border border-[#E5E5E5] px-4 py-3">
              {statusNames[task.status]}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-[#787486]">
              Due Date
            </p>

            <div className="rounded-xl border border-[#E5E5E5] px-4 py-3">
              {task.deadline || "No deadline"}
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="mt-8 flex-1">
          <h3 className="mb-5 text-lg font-semibold text-[#0D062D]">
            Checklist
          </h3>

          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" />
              <span>Create layout</span>
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" />
              <span>Responsive version</span>
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" />
              <span>Connect API</span>
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" />
              <span>Testing</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <button className="w-full rounded-xl bg-[#5030E5] py-3 font-medium text-white transition hover:bg-[#4123D7]">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
