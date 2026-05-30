import { useState } from "react";
import Counter from "./Counter";

const CartRow = ({ product }) => {
  const [isInCart, setIsInCart] = useState(true);

  return (
    isInCart && (
      <tr key={product.id}>
        <td>
          <div className="card card-side">
            <figure className="w-36 h-36 shrink-0">
              <img
                className="w-full h-full object-contain"
                src={
                  product.image
                    ? import.meta.env.VITE_API_URL + product.image
                    : null
                }
                alt={product.name}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.price}&#36;</p>
            </div>
          </div>
        </td>
        <td>{product.description}</td>
        <td>
          <Counter
            product={product}
            setIsInCart={setIsInCart}
          />
        </td>
        <td>{product.amount * product.price}&#36;</td>
      </tr>
    )
  );
};

export default CartRow;
