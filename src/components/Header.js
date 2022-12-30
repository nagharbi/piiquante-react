import React from "react";
import flame from "../images/flame.png";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <div className="left-nav">
        <ul>
          <li>
            <NavLink to="/sauces">ALL SAUCES</NavLink>
          </li>
          <li>
            <NavLink to="/sauces/create">ADD SAUCE</NavLink>
          </li>
        </ul>
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
          <li>
            <NavLink to="/register">SIGN UP</NavLink>
          </li>
          <li>
            <NavLink to="/login">LOGIN</NavLink>
          </li>
          <li>
            <a href="#">LOGOUT</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
