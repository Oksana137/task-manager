const deleteToken = () => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.error("An error occurred while log out:", error);
  }
};

export { deleteToken };