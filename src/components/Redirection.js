import React from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export default function Redirection(props) {
  const { userId, setUserId } = useContext(UserContext);
  if (userId) {
    return <Navigate to="/sauces" />;
  } else {
    return props.children;
  }
}