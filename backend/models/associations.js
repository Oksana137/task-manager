import Category from "./Category.js";
import Product from "./Product.js";
import Order from "./Order.js";
import User from "./User.js";
import ProductOrders from "./ProductOrders.js";

Category.hasMany(Product, {
  foreignKey: {
    allowNull: false,
    name: "categoryId",
  },
});

Product.belongsTo(Category, {
  foreignKey: { allowNull: false, name: "categoryId" },
  as: "category",
  onDelete: "CASCADE",
});

User.hasMany(Order, {
  foreignKey: {
    allowNull: false,
    name: "userId",
  },
});

Order.belongsTo(User, {
  foreignKey: { allowNull: false, name: "userId" },
  onDelete: "CASCADE",
});

Product.belongsToMany(Order, {
  through: "ProductOrders",
  as: "orders",
  foreignKey: "productId",
});
Order.belongsToMany(Product, {
  through: "ProductOrders",
  as: "products",
  foreignKey: "orderId",
});

User.sync();
Category.sync();
Product.sync();
Order.sync();
ProductOrders.sync();
