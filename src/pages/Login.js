import React, { useState } from "react";

export default function Login() {

  const [formData, setFormDate] = useState({
    email: '',
    password: ''
  });

  const [disabled, setDisabled] = useState(true);
  const errorMsg = "";
  
  const handleChange = (event) => {
    setFormDate({...formData, [event.target.name]: event.target.value});

    if (formData.email.length > 0 && formData.password.length > 0) {
        setDisabled(false);
    }
  }

  return (
    <form action="">
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
  );
}
