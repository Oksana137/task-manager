import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const getProductsByCategoryId = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
          required: true,
        },
      ],
      where: { categoryId },
    });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
