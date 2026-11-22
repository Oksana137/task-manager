import { useEffect, useId, useRef, useState } from "react";

const statusOptions = [
  { value: "to do", label: "To Do", dot: "bg-[#5030E5]" },
  { value: "on progress", label: "On Progress", dot: "bg-[#FFA500]" },
  { value: "done", label: "Done", dot: "bg-[#8BC48A]" },
];

const priorityOptions = [
  { value: "high", label: "High" },
  { value: "low", label: "Low" },
];

const TaskFilters = ({ filters, onApply }) => {
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const trigger = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const handleOutsidePress = (event) => {
      if (!root.current?.contains(event.target)) setOpen(false);
    };
    const handleEscape = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    };

    document.addEventListener("pointerdown", handleOutsidePress);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePress);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const apply = (nextFilters) => {
    onApply(nextFilters);
    setOpen(false);
    trigger.current?.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    apply({ statuses: fields.getAll("status"), priorities: fields.getAll("priority") });
  };

  return (
    <div ref={root} className="relative">
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((current) => !current)}
        className={`inline-flex h-11 items-center gap-2 rounded-xl border border-[#D7D4E6] px-4 text-sm font-semibold text-[#0D062D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5030E5] ${
          open || filters.statuses.length || filters.priorities.length ? "bg-[#EEEAFD]" : "bg-white"
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M3 4h18l-7 8v7l-4 2v-9L3 4Z" />
        </svg>
        Filters
      </button>

      {open && (
        <form
          id={panelId}
          aria-labelledby={`${panelId}-title`}
          onSubmit={handleSubmit}
          className="absolute right-0 top-full z-20 mt-2 w-64 rounded-2xl border border-[#D7D4E6] bg-white p-4 text-sm text-[#0D062D] shadow-lg"
        >
          <h2 id={`${panelId}-title`} className="mb-3 text-lg font-semibold">Filters</h2>

          {[
            { name: "status", title: "Status", options: statusOptions, checked: filters.statuses },
            { name: "priority", title: "Priority", options: priorityOptions, checked: filters.priorities },
          ].map(({ name, title, options, checked }) => (
            <fieldset key={name} className="mb-3">
              <legend className="mb-1 font-semibold text-[#787486]">{title}</legend>
              {options.map(({ value, label, dot }) => (
                <label key={value} className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-1.5 hover:bg-[#F8F7FC]">
                  <input
                    type="checkbox"
                    name={name}
                    value={value}
                    defaultChecked={checked.includes(value)}
                    className="h-4 w-4 accent-[#5030E5]"
                  />
                  {dot && <span aria-hidden="true" className={`h-2 w-2 rounded-full ${dot}`} />}
                  {label}
                </label>
              ))}
            </fieldset>
          ))}

          <div className="flex items-center justify-between gap-2 border-t border-[#ECECEC] pt-3">
            <button
              type="button"
              onClick={() => apply({ statuses: [], priorities: [] })}
              className="rounded-lg px-2 py-2 font-medium text-[#5030E5] hover:bg-[#EEEAFD]"
            >
              Clear all
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#5030E5] px-3 py-2 font-semibold text-white hover:bg-[#4123D7]"
            >
              Apply Filters
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TaskFilters;
