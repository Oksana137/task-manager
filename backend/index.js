import express from "express";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import taskRouter from "./routes/taskRouter.js";
import projectRouter from "./routes/projectRouter.js";
import "./models/associations.js";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import User from "./models/User.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use("/tasks", taskRouter);
app.use("/projects", projectRouter);

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use(errorHandler);

User.sync({ alter: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to sync User table:", error);
    process.exit(1);
  });
