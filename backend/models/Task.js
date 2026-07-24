import { DataTypes } from "sequelize";
import sequelize from "../db/server.js";

const Task = sequelize.define(
  "Task",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentsNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    priority: {
      type: DataTypes.ENUM("high", "low"),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("to do", "on progress", "done"),
      allowNull: false,
      defaultValue: "to do",
    },
  },
  {
    timestamps: false,
  },
);

export default Task;
