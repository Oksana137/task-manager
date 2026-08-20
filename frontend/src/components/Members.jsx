import { useEffect, useState } from "react";

import { fetchProjectMembers } from "../units/network";
import { useProject } from "../contexts/ProjectContext";

const getAvatarUrl = (member) =>
  `https://i.pravatar.cc/64?u=${encodeURIComponent(member.email ?? member.id)}`;

const Members = () => {
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

  if (members.length === 0) return null;

  return (
    <div className="avatar-group -space-x-3">
      {members.map((member) => (
        <div
          key={member.id}
          className="avatar"
          title={member.name || member.email}
        >
          <div className="w-8 rounded-full ring-2 ring-white">
            <img
              src={getAvatarUrl(member)}
              alt={member.name || member.email}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Members;