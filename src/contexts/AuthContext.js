import { createContext, useContext, useState } from "react";
import { getLocalStorage } from "../services/StroageService";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  console.log(JSON.stringify(getLocalStorage("auth")));
  const [auth, setAuth] = useState(getLocalStorage("auth"));

  // Login updates the user data with a name parameter
  const login = ({ userId, token}) => {
    setAuth(() => ({
      userId,
      token,
    }));
  };

  // Logout updates the user data to default
  const logout = () => {
    setAuth(() => ({
      userId: '',
      token: '',
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
