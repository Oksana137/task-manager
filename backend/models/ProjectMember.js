import { DataTypes } from "sequelize";
import sequelize from "../db/server.js";

const ProjectMember = sequelize.define(
  "ProjectMember",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Project",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  },
);

export default ProjectMember;