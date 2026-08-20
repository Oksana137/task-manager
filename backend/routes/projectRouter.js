import express from "express";
import {
  getProjects,
  getMyProjects,
  getProjectMembers,
} from "../controllers/project.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/").get(getProjects);
router.route("/mine").get(verifyToken, getMyProjects);
router.route("/:id/members").get(getProjectMembers);

export default router;
