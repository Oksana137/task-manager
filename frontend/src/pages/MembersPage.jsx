import { useEffect, useState } from "react";

import { fetchProjectMembers } from "../units/network";
import { useProject } from "../contexts/ProjectContext";
import AvatarIcon from "../components/AvatarIcon";

const MembersPage = () => {
  const { selectedProject } = useProject();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (!selectedProject) {
      setMembers([]);
      return;
    }

    const controller = new AbortController();

    fetchProjectMembers(selectedProject.id, { signal: controller.signal })
      .then(setMembers)
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching members:", error);
        }
      });

    return () => controller.abort();
  }, [selectedProject]);

  return (
    <div className="h-full overflow-y-auto bg-[#F8F9FD] p-6">
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-3xl font-bold text-[#0D062D]">
          {selectedProject
            ? `Members of ${selectedProject.title}`
            : "Members"}
        </h1>

        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEEAFD] text-sm font-semibold text-[#625F6D]">
          {members.length}
        </div>
      </div>

      {members.length === 0 ? (
        <div className="flex h-full max-h-[70%] w-full flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-[#E5E5E5] bg-white text-gray-400">
          <p className="text-lg font-medium">No members yet</p>
          <p className="text-sm">
            {selectedProject
              ? "This project has no members assigned"
              : "Select a project to see its members"}
          </p>
        </div>
      ) : (
        <div className="pt-6 grid grid-cols-2 gap-4 min-[900px]:grid-cols-3 min-[1200px]:grid-cols-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center gap-3 rounded-2xl border border-[#ECECEC] bg-white p-6 text-center shadow-sm"
            >
              <AvatarIcon iconId={member.avatarIcon} size={64} />

              <div className="min-w-0">
                <p className="truncate font-semibold text-[#0D062D]">
                  {member.name || member.email}
                </p>

                {member.city && (
                  <p className="truncate text-sm text-[#787486]">
                    {member.city}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MembersPage;