import express from "express";
import {
  getCategories,
  getCategoryByID,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.js";

const categoryRouter = express.Router();

categoryRouter.route("/").get(getCategories).post(createCategory);
categoryRouter
  .route("/:id")
  .get(getCategoryByID)
  .put(updateCategory)
  .delete(deleteCategory);

export default categoryRouter;
