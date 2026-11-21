import { createContext, useCallback, useState } from "react";
import { fetchCurrentUser } from "../units/network";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const loadUser = useCallback(async (signal) => {
    try {
      const currentUser = await fetchCurrentUser();
      if (signal?.aborted) return null;

      setUser(currentUser);
      setIsAuth(Boolean(currentUser));
      return currentUser;
    } catch (error) {
      if (signal?.aborted) return null;
      console.error("Authentication failed.", error);
      setUser(null);
      setIsAuth(false);
      return null;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, user, setUser, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
