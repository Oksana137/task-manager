import { Router } from "express";
import * as authController from "../controllers/auth.js";
import verifyToken from "../middleware/verifyToken.js";

const authRouter = Router();

authRouter.post("/register", authController.signUp);
authRouter.post("/login", authController.signIn);
authRouter.post("/demo", authController.signInDemo);
authRouter.get("/me", verifyToken, authController.getUser);

export default authRouter;
