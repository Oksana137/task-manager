const MembersHeader = ({ title, count }) => (
  <div className="flex items-center gap-3 p-8">
    <h1 className="text-3xl font-bold text-[#0D062D]">{title}</h1>

    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEEAFD] text-sm font-semibold text-[#625F6D]">
      {count}
    </div>
  </div>
);

export default MembersHeader;