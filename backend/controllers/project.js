import Project from "../models/Project.js";
import User from "../models/User.js";
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

// Get projects the authenticated user is a member of
export const getMyProjects = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.uid, {
      attributes: { exclude: ["password"] },
      include: {
        model: Project,
        as: "projects",
        through: { attributes: [] },
      },
    });

    if (!user) throw new ErrorResponse("User not found", 404);

    res.status(200).json(user.projects);
  } catch (err) {
    next(err);
  }
};

// Get members of a project
export const getProjectMembers = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      include: {
        model: User,
        as: "members",
        attributes: { exclude: ["password"] },
        through: { attributes: [] },
      },
    });

    if (!project) throw new ErrorResponse("Project not found", 404);

    res.status(200).json(project.members);
  } catch (err) {
    next(err);
  }
};
