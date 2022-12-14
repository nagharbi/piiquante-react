import React, { useContext } from "react";
import flame from "../images/flame.png";
import { NavLink } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
  const { userId } = useContext(UserContext);
  console.log(userId);
  return (
    <nav>
      <div className="left-nav">
        {userId ? (
          <ul>
            <li>
              <NavLink to="/sauces">ALL SAUCES</NavLink>
            </li>
            <li>
              <NavLink to="/sauces/create">ADD SAUCE</NavLink>
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
        {userId ? (
          <ul>
            <li>
              <NavLink to="/logout">LOGOUT</NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/register">SIGN UP</NavLink>
            </li>
            <li>
              <NavLink to="/login">LOGIN</NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
