import search from "../icons/search.svg";

const Search = () => {
  return (
    <div className="flex items-center gap-4 h-[44px] pl-8 pr-28 border rounded-lg bg-[#F5F5F5]">
      <img src={search} alt="search" />

      <input
        type="text"
        placeholder="Search for anything ..."
        className="w-full outline-none bg-transparent"
      />
    </div>
  );
};

export default Search;
