import { DataTypes } from "sequelize";
import sequelize from "../db/server.js";

const ProductOrders = sequelize.define(
  "ProductOrders",
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default ProductOrders;
