import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedLayout = () => {
  const { loadUser } = useContext(AuthContext);
  const [isSessionValid, setIsSessionValid] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    loadUser(controller.signal).then((user) => {
      if (!controller.signal.aborted) setIsSessionValid(Boolean(user));
    });
    return () => controller.abort();
  }, [loadUser]);

  if (isSessionValid === null) {
    return <p role="status" className="p-8 text-sm text-[#787486]">Checking your session…</p>;
  }

  return isSessionValid ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedLayout;
