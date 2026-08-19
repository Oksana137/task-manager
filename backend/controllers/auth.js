import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const signUp = async (req, res, next) => {
  try {
    const { email, password, name, city } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      throw new ErrorResponse("An account with this Email already exists", 409);

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hash,
      name,
      city,
    });
    const token = jwt.sign({ uid: newUser.id }, process.env.JWT_SECRET);
    res.status(201).send({ token });
  } catch (err) {
    next(err);
  }
};

// LOGIN
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) throw new ErrorResponse("Email does not exist", 404);

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) throw new ErrorResponse("Password is incorrect", 401);

    const token = jwt.sign({ uid: existingUser.id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.uid, {
      attributes: { exclude: ["password"] },
    });
    if (!user) throw new ErrorResponse("User not found", 404);

    res.json(user);
  } catch (err) {
    next(err);
  }
};
