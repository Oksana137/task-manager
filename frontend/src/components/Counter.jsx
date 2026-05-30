import { useContext, useState } from "react";
import {
  updateProductInCart,
  deleteProductInCart,
  getTotalPrice,
} from "../units/storage";
import { CartContext } from "../contexts/CartContext";

const Counter = ({ product, setIsInCart }) => {
  const { setTotalPrice, cartQuantities, setCartQuantities } =
    useContext(CartContext);
  const [amount, setAmount] = useState(product.amount);

  const increaseHandle = () => {
    setAmount((prev) => {
      product.amount = prev + 1;
      updateProductInCart(product);
      setCartQuantities(cartQuantities + 1);
      setTotalPrice(getTotalPrice());
      return product.amount;
    });
  };

  const decreaseHandle = () => {
    setAmount((prev) => {
      if (prev === 1) {
        deleteProductInCart(product);
        setIsInCart(false);
        setCartQuantities(cartQuantities - 1);
        setTotalPrice(getTotalPrice());
        return 0;
      }
      product.amount = prev - 1;
      updateProductInCart(product);
      setCartQuantities(cartQuantities - 1);
      setTotalPrice(getTotalPrice());
      return product.amount;
    });
  };

  return (
    <div className="join">
      <button className="join-item btn" onClick={decreaseHandle}>
        &#8722;
      </button>
      <button className="join-item btn">{amount}</button>
      <button className="join-item btn" onClick={increaseHandle}>
        &#43;
      </button>
    </div>
  );
};

export default Counter;
