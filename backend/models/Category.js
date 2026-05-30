import { DataTypes } from "sequelize";
import sequelize from "../db/server.js";

const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Category;
