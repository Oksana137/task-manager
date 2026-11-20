import Project from "./Project.js";
import Task from "./Task.js";

Project.hasMany(Task, {
  foreignKey: "projectId",
  as: "task",
});

Task.belongsTo(Project, {
  foreignKey: "projectId",
  as: "project",
});
