import Order from "../models/Order.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import ProductOrders from "../models/ProductOrders.js";
import ErrorReponse from "../utils/ErrorResponse.js";

export const getOrders = async (req, res, next) => {
  try {
    const { uid } = req;
    const orders = await Order.findAll({
      include: [
        {
          model: Product,
          as: "products",
          required: true,
          include: [
            {
              model: Category,
              as: "category",
              required: true,
            },
          ],
        },
      ],
      where: { userId: uid },
    });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Product,
          as: "products",
          required: true,
        },
      ],
    });
    if (!order) {
      throw new ErrorReponse("Order not found.", 404);
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    console.log({
      method: req.method,
      url: req.originalUrl,
      headers: {
        host: req.headers.host,
        userAgent: req.headers["user-agent"],
        authorization: req.headers.authorization
          ? "Bearer [REDACTED]"
          : undefined,
      },
      body: req.body,
    });

    const { uid } = req;
    const { products, total } = req.body;
    if (!products || !total) {
      throw new ErrorReponse("Products and total are required!", 400);
    }
    const order = await Order.create({ userId: uid, date: Date.now(), total });

    for (const product of products) {
      await ProductOrders.create({
        orderId: order.id,
        productId: product.id,
        quantity: product.quantity,
      });
    }

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { products, total } = req.body;
    if (!products || !total) {
      throw new ErrorReponse("Products and total are required!", 400);
    }
    const order = await Order.findByPk(id);
    if (!order) throw new ErrorReponse("Order not found", 404);
    const updatedOrder = await order.update(req.body);
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) throw new ErrorReponse("Order not found", 404);
    await order.destroy();
    res.status(200).json({ message: `Order deleted, id: ${id}` });
  } catch (error) {
    next(error);
  }
};
