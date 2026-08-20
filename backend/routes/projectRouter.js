import express from "express";
import { getProjects, getProjectMembers } from "../controllers/project.js";

const router = express.Router();

router.route("/").get(getProjects);
router.route("/:id/members").get(getProjectMembers);

export default router;
