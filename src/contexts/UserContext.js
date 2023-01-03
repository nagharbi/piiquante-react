import { createContext, useState } from "react";
// creer une contexte pour passer des valeurs pour les composants enfants
export const UserContext = createContext({});
// fournisseur des données
export const UserProvider = (props) => {
  const userIdStorage = localStorage.getItem("userId");
  const [userId, setUserId] = useState(userIdStorage);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {props.children}
    </UserContext.Provider>
  );
};
