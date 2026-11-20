import Project from "../models/Project.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getMyProjects = async (req, res, next) => {
  try {
    const projects = await Project.findAll({ where: { ownerId: req.uid } });
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const title = typeof req.body?.title === "string" ? req.body.title.trim() : "";
    if (!title || title.length > 255) {
      throw new ErrorResponse("Project name must be between 1 and 255 characters", 400);
    }

    const project = await Project.create({
      title,
      color: "#5030E5",
      ownerId: req.uid,
    });

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};
