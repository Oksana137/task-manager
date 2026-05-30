import express from "express";
import { getProductsByCategoryId } from "../controllers/productCategory.js";

const router = express.Router();

router.route("/:categoryId").get(getProductsByCategoryId);

export default router;
