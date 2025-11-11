import { addToCart, getCartProduct, removeFromCart } from "../models/orderModel.js";

export async function addProductToCart(req, res) {
  try {
    const { user_id, product_id, size, color, quantity, price } = req.body;
    const items = await addToCart(
      user_id,
      product_id,
      size,
      color,
      quantity,
      price
    );
    res.status(201).json({
      message: "Products added to cart",
      items,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: err.message || "Something went wrong",
    });
  }
}

export async function getProductOfCart(req, res) {
  try {
    const user_id = req.user.user_id;
    const result = await getCartProduct(user_id);
    res.status(201).json({
      message: "Product on the Cart",
      result,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: err.message || "Something went wrong",
    });
  }
}

export async function removeProductFromCart(req, res) {
  try {
    const { user_id, order_item_id } = req.body;
    const order = await removeFromCart(user_id, order_item_id);
    res.status(201).json({
      message: "Removed from Cart",
      order,
    });
  } catch (err) {
    console.log(err.message);
    res.status(err.status || 500).json({
      code: err.code || "INTERNAL_SERVER_ERRORs",
      message: err.message || "Something went wrong",
    });
  }
}
