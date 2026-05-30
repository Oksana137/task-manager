import express from "express";
import "./models/associations.js";
import categoryRouter from "./routes/categoryRouter.js";
import orderRouter from "./routes/orderRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import productCategoryRouter from "./routes/productCategoryRouter.js";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/img", express.static("img"));

app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/products/category", productCategoryRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
