import React, { useState } from "react";
import { login } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resultat = await login(email, password);
      console.log(resultat);
      localStorage.setItem("token", resultat.token);
      localStorage.setItem("userId", resultat.userId);

      setErrorMessage("");
      if (resultat.message) {
        setErrorMessage(resultat.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container">
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleEmail}
            name="email"
            type="email"
            className="form-control"
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handlePassword}
            name="password"
            type="password"
            value={password}
            className="form-control"
            required
          />
        </div>
        <p className="text-danger">{errorMessage}</p>
        <button color="primary">LOGIN</button>
      </form>
    </div>
  );
}
