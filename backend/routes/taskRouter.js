import express from "express";
import { getTasks, createTask, updateTask } from "../controllers/task.js";

const router = express.Router();

router.route("/").get(getTasks).post(createTask);
router.route("/:id").patch(updateTask);

export default router;
