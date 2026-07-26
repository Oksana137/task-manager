import express from "express";
import { getTasks, createTask } from "../controllers/task.js";

const router = express.Router();

router.route("/").get(getTasks).post(createTask);

export default router;
