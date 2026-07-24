import Task from "../models/Task.js";
import Project from "../models/Project.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// Get all tasks
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      include: {
        model: Project,
        as: "project",
      },
    });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};
