import { createContext, useState, useEffect } from "react";
import { isAuthorize } from "../units/network";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    isAuthorize()
      .then((status) => {
        setIsAuth(status);
      })
      .catch((error) => console.error("Authentication failed.", error));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
