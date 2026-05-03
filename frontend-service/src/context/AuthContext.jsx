import { createContext, useContext, useMemo, useState } from "react";
import { loginUser } from "../services/authApi.js";
import {
  clearStoredToken,
  getStoredToken,
  storeToken,
} from "../utils/tokenStorage.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken());

  async function login(credentials) {
    const data = await loginUser(credentials);
    storeToken(data.token);
    setToken(data.token);
    return data;
  }

  function logout() {
    clearStoredToken();
    setToken(null);
  }

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
