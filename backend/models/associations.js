import Project from "./Project.js";
import Task from "./Task.js";
import User from "./User.js";
import ProjectMember from "./ProjectMember.js";

Project.hasMany(Task, {
  foreignKey: "projectId",
  as: "task",
});

Task.belongsTo(Project, {
  foreignKey: "projectId",
  as: "project",
});

Project.belongsToMany(User, {
  through: ProjectMember,
  foreignKey: "projectId",
  otherKey: "userId",
  as: "members",
});

User.belongsToMany(Project, {
  through: ProjectMember,
  foreignKey: "userId",
  otherKey: "projectId",
  as: "projects",
});
