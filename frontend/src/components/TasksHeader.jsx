import MembersList from "./MembersList";

const TasksHeader = ({ count }) => (
  <div className="flex items-center justify-between p-8">
    <div className="flex items-center gap-3">
      <h1 className="text-3xl font-bold text-[#0D062D]">Tasks</h1>

      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEEAFD] text-sm font-semibold text-[#625F6D]">
        {count}
      </div>
    </div>

    <MembersList />
  </div>
);

export default TasksHeader;