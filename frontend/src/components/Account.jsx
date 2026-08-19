import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";
import Logout from "./Logout";

const Account = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right sm:block">
        <p className="font-semibold text-[#0D062D]">
          {user?.name ?? user?.email ?? "Guest"}
        </p>

        {user?.city && <p className="text-sm text-[#787486]">{user.city}</p>}
      </div>

      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Profile"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>

        <div
          tabIndex={0}
          className="dropdown-content z-30 mt-3 w-56 rounded-2xl border border-[#ECECEC] bg-white p-3 shadow-lg"
        >
          <div className="flex items-center gap-3 border-b border-[#ECECEC] px-1 pb-3">
            <div className="avatar">
              <div className="w-9 rounded-full">
                <img
                  alt="Profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#0D062D]">
                {user?.name ?? "Guest"}
              </p>
              <p className="truncate text-xs text-[#787486]">
                {[user?.city, user?.email].filter(Boolean).join(" · ")}
              </p>
            </div>
          </div>

          <Logout className="mt-2 w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-red-500 transition hover:bg-red-50" />
        </div>
      </div>
    </div>
  );
};

export default Account;
