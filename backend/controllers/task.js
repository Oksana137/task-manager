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

// Create task
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, projectId } = req.body;

    if (!title || !projectId) {
      return next(new ErrorResponse("Title and projectId are required", 400));
    }

    const project = await Project.findByPk(projectId);

    if (!project) {
      return next(new ErrorResponse("Project not found", 404));
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      projectId,
    });

    const createdTask = await Task.findByPk(task.id, {
      include: {
        model: Project,
        as: "project",
      },
    });

    res.status(201).json(createdTask);
  } catch (err) {
    next(err);
  }
};

// Update task
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, projectId } = req.body;

    const task = await Task.findByPk(id);

    if (!task) {
      return next(new ErrorResponse("Task not found", 404));
    }

    // Если меняется проект — проверяем, что он существует
    if (projectId) {
      const project = await Project.findByPk(projectId);

      if (!project) {
        return next(new ErrorResponse("Project not found", 404));
      }
    }

    await task.update({
      title,
      description,
      status,
      priority,
      projectId,
    });

    const updatedTask = await Task.findByPk(id, {
      include: {
        model: Project,
        as: "project",
      },
    });

    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};
