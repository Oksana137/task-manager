import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import Logout from "./Logout";

const Navigation = () => {
  const { cartQuantities } = useContext(CartContext);
  const { isAuth } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-300 pr-8">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          eCommerce
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/orders"} className="btn btn-ghost">
              Orders
            </Link>
          </li>
          {isAuth && (
            <li>
              <Logout />
            </li>
          )}
        </ul>
        <Link to={"/cart"} role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartQuantities != 0 && (
              <span className="badge badge-sm indicator-item">
                {cartQuantities}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
