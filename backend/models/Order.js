import { DataTypes } from "sequelize";
import sequelize from "../db/server.js";

const Order = sequelize.define(
  "Order",
  {
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Order;
