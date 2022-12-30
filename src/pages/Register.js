import React, { useState } from "react";
import { signup } from "../services/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const resultat = await signup(email, password);
      console.log(resultat);

      if (resultat.message) {
        setError(resultat.message);
      }
      if (resultat.error) {
        setError(resultat.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className="form-control"
            id="email"
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="form-control"
            id="password"
            value={password}
            required
          />
        </div>
        <button color="primary" type="submit">
          SIGN UP
        </button>
        <p className="text-danger">{error}</p>
      </form>
    </div>
  );
}
