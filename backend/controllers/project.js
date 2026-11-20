import Project from "../models/Project.js";

export const getMyProjects = async (req, res, next) => {
  try {
    const projects = await Project.findAll({ where: { ownerId: req.uid } });
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};
