import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// Get all users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err); // Pass the error to the error-handling middleware
  }
};

// Post a new user
const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await User.create({ email, password });
    res.status(201).json(newUser);
  } catch (err) {
    next(err); // Pass the error to the error-handling middleware
  }
};

// Get user by ID
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      throw new ErrorResponse("User not found", 404); // Use ErrorResponse for missing users
    }
    res.status(200).json(user);
  } catch (err) {
    next(err); // Pass the error to the error-handling middleware
  }
};

// Update a user
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Delete a user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err); // Pass the error to the error-handling middleware
  }
};

export { getUsers, createUser, getUserById, updateUser, deleteUser };
