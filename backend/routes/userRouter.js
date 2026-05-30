import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

const router = Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
