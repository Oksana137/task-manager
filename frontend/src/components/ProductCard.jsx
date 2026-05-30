import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import Counter from "./Counter";
import { addProductToCart, isProductInCart } from "../units/storage";

const ProductCard = ({ product }) => {
  const [isInCart, setIsInCart] = useState(isProductInCart(product));
  const { cartQuantities, setCartQuantities } = useContext(CartContext);

  const addToCartHandle = () => {
    setIsInCart(true);
    product.amount = 1;
    addProductToCart(product);
    setCartQuantities(cartQuantities + 1);
  };

  return (
    <div className="card bg-base-100 w-96 h-96 shadow-xl">
      <figure className="w-full h-3/5">
        <img
          className="w-full h-full object-contain"
          src={
            product.image ? import.meta.env.VITE_API_URL + product.image : null
          }
          alt="Product"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.name.split(" ").slice(0, 3).join(" ")}
        </h2>
        <span>{product.price}&#36;</span>
        <Link to={`/category/${product.category.id}`} className="link">
          {product.category.name}
        </Link>
        <div className="card-actions justify-end">
          {isInCart ? (
            <Counter product={product} setIsInCart={setIsInCart} />
          ) : (
            <button
              className="btn btn-default"
              onClick={() => {
                addToCartHandle();
              }}
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
