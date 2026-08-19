import { useNavigate } from "react-router-dom";
import { deleteToken } from "../units/storage";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const Logout = ({ className = "btn btn-ghost" }) => {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    deleteToken();
    setIsAuth(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className={className}>
      Log out
    </button>
  );
};

export default Logout;
