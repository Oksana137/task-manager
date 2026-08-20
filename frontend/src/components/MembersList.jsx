import { useEffect, useState } from "react";

import { fetchProjectMembers } from "../units/network";
import { useProject } from "../contexts/ProjectContext";

const getAvatarUrl = (member) =>
  `https://i.pravatar.cc/64?u=${encodeURIComponent(member.email ?? member.id)}`;

const MembersList = () => {
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
    <ul className="flex flex-row items-center justify-end gap-3 py-6">
      {members.map((member) => (
        <li key={member.id} title={member.name || member.email}>
          <div className="avatar">
            <div className="w-9 rounded-full ring-2 ring-white">
              <img
                src={getAvatarUrl(member)}
                alt={member.name || member.email}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MembersList;