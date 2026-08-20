import { useEffect, useState } from "react";

import { fetchProjectMembers } from "../units/network";
import { useProject } from "../contexts/ProjectContext";

const getAvatarUrl = (member) =>
  `https://i.pravatar.cc/128?u=${encodeURIComponent(member.email ?? member.id)}`;

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
      <h1 className="mb-6 text-3xl font-bold text-[#0D062D]">
        {selectedProject
          ? `Members of ${selectedProject.title}`
          : "Members"}
      </h1>

      <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-3 min-[1200px]:grid-cols-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center gap-3 rounded-2xl border border-[#ECECEC] bg-white p-6 text-center shadow-sm"
          >
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img
                  src={getAvatarUrl(member)}
                  alt={member.name || member.email}
                />
              </div>
            </div>

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
    </div>
  );
};

export default MembersPage;