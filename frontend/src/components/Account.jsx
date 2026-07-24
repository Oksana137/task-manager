const Account = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col text-right">
        <p className="font-semibold">Anima Agrawal</p>
        <p className="text-sm text-[#787486]">U.P, India</p>
      </div>

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
    </div>
  );
};

export default Account;
