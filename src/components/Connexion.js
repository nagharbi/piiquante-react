import React from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export default function Connexion(props) {
  const { userId, setUserId } = useContext(UserContext);
  if (!userId) {
    return <Navigate to="/login" />;
  } else {
    return props.children;
  }
}
