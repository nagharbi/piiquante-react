import React from "react";
import flame from "../images/flame.png"

export default function Header() {
  return (
    <nav>
      <div className="left-nav">
        <ul>
          <li>
            <a href="#">ALL SAUCES</a>
          </li>
          <li>
            <a href="#">ADD SAUCE</a>
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
            <a href="#">SIGN UP</a>
          </li>
          <li>
            <a href="#">LOGIN</a>
          </li>
          <li>
            <a href="#">LOGOUT</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
