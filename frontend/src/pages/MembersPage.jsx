import { useEffect, useState } from "react";

import { fetchProjectMembers } from "../units/network";
import { useProject } from "../contexts/ProjectContext";
import AvatarIcon from "../components/AvatarIcon";
import NoProjects from "../components/NoProjects";
import NoMembers from "../components/NoMembers";
import MembersHeader from "../components/MembersHeader";

const MembersPage = () => {
  const { selectedProject, projects, projectsLoaded } = useProject();
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

  if (projectsLoaded && projects.length === 0) {
    return <NoProjects />;
  }

  if (members.length === 0) {
    return (
      <NoMembers
        message={
          selectedProject
            ? "This project has no members assigned"
            : "Select a project to see its members"
        }
      />
    );
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-[#F8F9FD]">
      <MembersHeader
        title={
          selectedProject ? `Members of ${selectedProject.title}` : "Members"
        }
        count={members.length}
      />

      <div className="mt-6 flex-1 px-8 pb-8">
        <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-3 min-[1200px]:grid-cols-4">
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
      </div>
    </div>
  );
};

export default MembersPage;