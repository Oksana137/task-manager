import express from "express";
import { getProjects } from "../controllers/project.js";

const router = express.Router();

router.route("/").get(getProjects);

export default router;
