import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import flame from "../images/flame.png";

export default function Header() {
  const { auth } = useContext(AuthContext);

  return (
    <nav>
      <div className="left-nav">
        {auth?.userId ? (
          <ul>
            <li>
              <a href="#">ALL SAUCES</a>
            </li>
            <li>
              <a href="#">ADD SAUCE</a>
            </li>
          </ul>
        ) : null}
      </div>
      <div className="logo">
        <div className="logo-image">
          <img alt="Flame logo" src={flame} />
        </div>
        <div className="logo-text">
          <h1>HOT TAKES</h1>
          <h5>THE WEB'S BEST HOT SAUCE REVIEWS</h5>
        </div>
      </div>
      <div className="right-nav">
        <ul>
          {auth?.userId ? (
            <li>
              <a href="#">LOGOUT</a>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/register">SIGN UP</NavLink>
              </li>
              <li>
                <NavLink to="/login">LOGIN</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
