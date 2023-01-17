import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function AuthVerify(props) {
  let location = useLocation();

  useEffect(() => {
    const decodedJwt = parseJwt(localStorage.getItem("token"));
    if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
      props.logout();
    }
  }, [location, props]);

  return <></>;
}
