import { getAvatarIcon } from "../units/avatarIcons";

const AvatarIcon = ({ iconId, size = 40, className = "" }) => {
  const icon = getAvatarIcon(iconId);

  return (
    <div
      role="img"
      aria-label={icon.id}
      className={`flex shrink-0 items-center justify-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: icon.color,
        fontSize: size * 0.55,
      }}
    >
      {icon.emoji}
    </div>
  );
};

export default AvatarIcon;