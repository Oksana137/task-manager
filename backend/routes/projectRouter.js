import express from "express";
import { getMyProjects } from "../controllers/project.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.use(verifyToken);
router.get(["/", "/mine"], getMyProjects);

export default router;
