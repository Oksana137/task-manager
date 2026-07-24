import Project from "../models/Project.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// Get all projects
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};
