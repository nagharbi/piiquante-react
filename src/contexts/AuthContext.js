import { createContext, useContext, useState } from "react";
import { getLocalStorage } from "../services/StroageService";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => getLocalStorage("auth"));

  return (
    <AuthContext.Provider
      value={{
        userId: auth?.userId || null,
        token: auth?.token || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

// export function AuthProvider({ children }) {
//   const [auth, setAuth] = useState(() => getLocalStorage("auth"));

//   useEffect(() => {
//     setLocalStorage("auth", auth);
//   }, [auth]);

//   return (
//     <AuthContext.Provider
//       value={{
//         userId: auth?.userId || null,
//         token: auth?.token || null,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }
