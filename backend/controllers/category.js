import Category from "../models/Category.js";
import ErrorReponse from "../utils/ErrorResponse.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      throw new ErrorReponse("Category not found.", 404);
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new ErrorReponse("Category name is required!", 400);
    }
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      throw new ErrorReponse("Category name is required!", 400);
    }
    const category = await Category.findByPk(id);
    if (!category) throw new ErrorReponse("Category not found", 404);
    const updatedCategory = await category.update(req.body);
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) throw new ErrorReponse("Category not found", 404);
    await category.destroy();
    res.status(200).json({ message: `Category deleted, id: ${id}` });
  } catch (error) {
    next(error);
  }
};
