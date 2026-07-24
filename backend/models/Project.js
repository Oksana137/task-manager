import { DataTypes } from "sequelize";
import sequelize from "../db/server.js";

const Project = sequelize.define(
  "Project",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

export default Project;
