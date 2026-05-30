import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";

const verifyToken = async (req, res, next) => {
  try {
  const token = req.headers["authorization"];
  if (!token) throw new ErrorResponse("Authentication failed. Please log in.", 401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.uid = decoded.uid;
  next();
  } catch(err) {
    next(new ErrorResponse("Authentication failed. Please log in.", 401));
  }
};

export default verifyToken;
