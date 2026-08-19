export const statusNames = {
  "to do": "To Do",
  "on progress": "On Progress",
  done: "Completed",
};

export const statusColors = {
  "to do": "bg-red-100 text-red-600",
  "on progress": "bg-yellow-100 text-yellow-600",
  done: "bg-green-100 text-green-600",
};

export const statusDots = {
  "to do": "bg-red-500",
  "on progress": "bg-yellow-500",
  done: "bg-green-500",
};

export const getTaskBadge = ({ status, priority }) => {
  if (status === "done") {
    return {
      text: "Completed",
      textColor: "#68B266",
      bgColor: "rgba(104,178,102,0.2)",
    };
  }

  if (priority === "high") {
    return {
      text: "High",
      textColor: "#D8727D",
      bgColor: "rgba(216,114,125,0.1)",
    };
  }

  return {
    text: "Low",
    textColor: "#D58D49",
    bgColor: "rgba(213,141,73,0.2)",
  };
};