import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setLocalStorage } from "../services/StroageService";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormDate] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    setFormDate({ ...formData, [event.target.name]: event.target.value });

    if (formData.email.length > 0 && formData.password.length > 0) {
      setDisabled(false);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );
      setLocalStorage("auth", res.data);
      setErrorMsg("");
      login(res.data)
      navigate("/");
    } catch (e) {
      setErrorMsg(e.message);
    }
  };

  return (
    <div className="container">
      <form action="" onSubmit={handleClick}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            onChange={handleChange}
          />
        </div>
        <button color="primary" disabled={disabled}>
          LOGIN
        </button>
        <p className="text-danger">{errorMsg}</p>
      </form>
    </div>
  );
}
