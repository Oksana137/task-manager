const NoMembers = ({ message }) => (
  <div className="flex h-full w-full items-center justify-center bg-[#F8F9FD] p-6">
    <div className="flex max-w-sm flex-col items-center gap-2 rounded-3xl border border-dashed border-[#E5E5E5] bg-white p-10 text-center text-gray-400">
      <p className="text-lg font-medium text-[#0D062D]">No members yet</p>
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

export default NoMembers;