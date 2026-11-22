import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";
import SignOutButton from "./SignOutButton";
import AvatarIcon from "./AvatarIcon";

const AccountMenu = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        aria-label="Account menu"
        className="btn btn-ghost btn-circle ring-1 ring-[#DBDBDB]"
      >
        <AvatarIcon iconId={user?.avatarIcon} size={40} />
      </div>

      <div
        tabIndex={0}
        className="dropdown-content z-30 mt-3 w-56 rounded-2xl border border-[#ECECEC] bg-white p-3 shadow-lg"
      >
        <div className="flex items-center gap-3 border-b border-[#ECECEC] px-1 pb-3">
          <AvatarIcon iconId={user?.avatarIcon} size={36} />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#0D062D]">
              {user?.name}
            </p>
            <p className="truncate text-xs text-[#787486]">
              {[user?.city, user?.email].filter(Boolean).join(" · ")}
            </p>
          </div>
        </div>

        <SignOutButton className="mt-2 w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-red-500 transition hover:bg-red-50" />
      </div>
    </div>
  );
};

export default AccountMenu;
