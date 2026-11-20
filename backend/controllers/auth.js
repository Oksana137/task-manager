import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const demoCredentials = {
  email: "axana13@gmail.com",
  password: "11111111",
};

// REGISTER
export const signUp = async (req, res, next) => {
  try {
    const { email, password, name, city, avatarIcon } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      throw new ErrorResponse("An account with this Email already exists", 409);

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hash,
      name,
      city,
      avatarIcon,
    });
    const token = jwt.sign({ uid: newUser.id }, process.env.JWT_SECRET);
    res.status(201).send({ token });
  } catch (err) {
    next(err);
  }
};

const createLoginToken = (user) =>
  jwt.sign({ uid: user.id }, process.env.JWT_SECRET, { expiresIn: "30m" });

const authenticate = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new ErrorResponse("Email does not exist", 404);
  if (!(await bcrypt.compare(password, user.password))) {
    throw new ErrorResponse("Password is incorrect", 401);
  }
  return user;
};

// LOGIN
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authenticate(email, password);
    res.json({ token: createLoginToken(user) });
  } catch (err) {
    next(err);
  }
};

export const signInDemo = async (_req, res, next) => {
  try {
    const user = await authenticate(demoCredentials.email, demoCredentials.password);
    res.json({ token: createLoginToken(user) });
  } catch (err) {
    if (err.statusCode === 401 || err.statusCode === 404) {
      return next(new ErrorResponse("Demo account credentials are invalid", 503));
    }
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
