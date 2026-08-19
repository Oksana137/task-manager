import { createContext, useCallback, useEffect, useState } from "react";
import { fetchCurrentUser } from "../units/network";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const loadUser = useCallback(async () => {
    try {
      const currentUser = await fetchCurrentUser();

      setUser(currentUser);
      setIsAuth(Boolean(currentUser));
    } catch (error) {
      console.error("Authentication failed.", error);
      setUser(null);
      setIsAuth(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, user, setUser, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
