import Product from "../models/Product.js";
import Category from "../models/Category.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// Get all products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
          required: true,
        },
      ],
    });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// Create a new product
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, categoryId } = req.body;
    const newProduct = await Product.create({
      name,
      description,
      price,
      categoryId,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

// Get product by ID
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      throw new ErrorResponse("Product not found", 404);
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// Update a product
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, categoryId } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      throw new ErrorResponse("Product not found", 404);
    }
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.categoryId = categoryId || product.categoryId;
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// Delete a product
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      throw new ErrorResponse("Product not found", 404);
    }
    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};
