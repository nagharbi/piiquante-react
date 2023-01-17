import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Logout() {
  const { userId, setUserId } = useContext(UserContext);
  useEffect(() => {
    localStorage.clear();
    setUserId(null);
  }, []);
  return <Navigate to="/login" />;
}
