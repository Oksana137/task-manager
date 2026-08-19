import colorfilter from "../icons/colorfilter.svg";
import arrows from "../icons/arrows.svg";

const Logo = () => {
  return (
    <div className="h-full px-4 py-6 border-b-[1px] border-r-[1px] border-[#DBDBDB] flex items-center">
      <div className="flex gap-14">
        <div className="flex gap-2">
          <img src={colorfilter} alt="colorfilter" />
          <p className="inter text-2xl whitespace-nowrap"> Project M. </p>
        </div>
        <img src={arrows} alt="arrows" />
      </div>
    </div>
  );
};

export default Logo;
