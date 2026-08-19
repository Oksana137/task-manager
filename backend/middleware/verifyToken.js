import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";

const verifyToken = async (req, res, next) => {
  try {
  const authHeader = req.headers["authorization"];
  if (!authHeader) throw new ErrorResponse("Authentication failed. Please log in.", 401);

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.uid = decoded.uid;
  next();
  } catch(err) {
    next(new ErrorResponse("Authentication failed. Please log in.", 401));
  }
};

export default verifyToken;
