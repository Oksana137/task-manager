const Logo = () => {
  return (
    <div className="relative flex h-full items-center gap-2 px-3 text-white after:absolute after:inset-x-7 after:bottom-0 after:border-b after:border-white/25 after:content-[''] lg:gap-3 lg:px-8">
      <span aria-hidden="true" className="size-3 shrink-0 rounded-full bg-[#633BEE] lg:size-4" />
      <p className="whitespace-nowrap font-bold tracking-tight lg:text-2xl">Project M.</p>
    </div>
  );
};

export default Logo;
