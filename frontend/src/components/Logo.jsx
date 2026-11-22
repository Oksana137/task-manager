const Logo = () => {
  return (
    <div className="relative flex h-full items-center gap-2 px-3 text-white after:absolute after:inset-x-7 after:bottom-0 after:border-b after:border-white/25 after:content-[''] lg:gap-3 lg:px-8">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 shrink-0 text-[#B6A0FA] lg:size-6"
      >
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="m8 12 2.8 2.8L16 9.5" />
      </svg>
      <p className="whitespace-nowrap font-bold tracking-tight lg:text-2xl">NextStep</p>
    </div>
  );
};

export default Logo;
