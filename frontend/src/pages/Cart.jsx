import { useContext, useEffect, useState } from "react";
import { getProductsInCart, getTotalPrice } from "../units/storage";
import { createOrder } from "../units/network";
import { CartContext } from "../contexts/CartContext";
import CartRow from "../components/CartRow";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const { totalPrice, setTotalPrice, cartQuantities, setCartQuantities } =
    useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getProductsInCart());
    setTotalPrice(getTotalPrice());
  }, []);

  const placeOrderHandle = () => {
    const controller = new AbortController();

    const products = cart.map((item) => ({
      id: item.id,
      quantity: item.amount,
    }));

    const options = {
      signal: controller.signal,
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products,
        total: totalPrice,
      }),
    };

    createOrder(options)
      .then(() => {
        localStorage.setItem("cart", JSON.stringify([]));
        setCart(null);
        setCartQuantities(0);
        navigate("/orders");
      })
      .catch((error) => {
        console.error("Error creating order:", error.message);
        if (error.status === 401) {
          navigate("/login");
        }
      });

    return () => {
      controller.abort();
    };
  };

  return (
    <>
      {cartQuantities > 0 ? (
        <div className="flex flex-col overflow-x-auto max-w-7xl m-auto p-8">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.map((product) => (
                  <CartRow key={product.id} product={product} />
                ))}
            </tbody>
          </table>
          <div className="self-end m-4">
            {totalPrice && (
              <div className="mb-4">
                Total: <span>{totalPrice}&#36;</span>
              </div>
            )}
            <div>
              <button className="btn btn-wide" onClick={placeOrderHandle}>
                Place order
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center m-8">There are no products in the cart.</div>
      )}
    </>
  );
};

export default Cart;
