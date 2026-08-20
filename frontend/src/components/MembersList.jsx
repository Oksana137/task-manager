import { useEffect, useState } from "react";

import { fetchProjectMembers } from "../units/network";
import { useProject } from "../contexts/ProjectContext";
import AvatarIcon from "./AvatarIcon";

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
    <ul className="flex flex-row items-center justify-end gap-3">
      {members.map((member) => (
        <li key={member.id} title={member.name || member.email}>
          <AvatarIcon
            iconId={member.avatarIcon}
            size={40}
            className="ring-2 ring-white"
          />
        </li>
      ))}
    </ul>
  );
};

export default MembersList;