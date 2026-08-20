export const AVATAR_ICONS = [
  { id: "fox", emoji: "🦊", color: "#FDE7D9" },
  { id: "cat", emoji: "🐱", color: "#E9E1FB" },
  { id: "owl", emoji: "🦉", color: "#DFF3E3" },
  { id: "panda", emoji: "🐼", color: "#E6ECF5" },
  { id: "lion", emoji: "🦁", color: "#FCEFD0" },
  { id: "koala", emoji: "🐨", color: "#E4E4E4" },
  { id: "penguin", emoji: "🐧", color: "#DCEEF9" },
  { id: "rabbit", emoji: "🐰", color: "#FBE2EC" },
];

export const DEFAULT_AVATAR_ICON_ID = AVATAR_ICONS[0].id;

export const getAvatarIcon = (id) => {
  const byId = AVATAR_ICONS.find((icon) => icon.id === id);
  if (byId) return byId;

  const index = Number(id);
  if (Number.isInteger(index) && AVATAR_ICONS[index]) {
    return AVATAR_ICONS[index];
  }

  return AVATAR_ICONS[0];
};