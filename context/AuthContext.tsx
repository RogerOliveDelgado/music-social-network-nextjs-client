import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";

import { Children } from "../interfaces/interfaces";

interface ContextProps {
  isAuthenticated: string | null;
}

export const AuthContext = createContext<ContextProps>({} as ContextProps);

export function AuthContextProvider({ children }: Children) {
  const [isAuthenticated, setIsAuthenticated] = useState<string | null>(String);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("userToken"));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
