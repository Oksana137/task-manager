import { createContext, useState } from "react";
import { getCartQuantities, getTotalPrice } from "../units/storage";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(getTotalPrice());
  const [cartQuantities, setCartQuantities] = useState(getCartQuantities());

  return (
    <CartContext.Provider
      value={{ cartQuantities, setCartQuantities, totalPrice, setTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
