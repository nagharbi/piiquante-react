import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllSauces } from "../services/sauces";

export default function Sauces() {
  const [sauces, setSauces] = useState([]);
  useEffect(() => {
    async function load() {
      const data = await getAllSauces();
      setSauces(data);
      console.log(data);
    }
    load();
  }, []);

  return (
    <div className="container">
      {sauces.length > 0 ? (
        <>
          <p className="list-title">THE SAUCES</p>
          <div className="sauce-list">
            {sauces.map((sauce, index) => (
              <NavLink to={"/sauces/"+ sauce._id} key={index} className="sauce-list-item">
                <img alt={sauce.name} src={sauce.imageUrl} />
                <h4>{sauce.name}</h4>
                <p>Heat: {sauce.heat}/10</p>
              </NavLink>
            ))}
          </div>
        </>
      ) : (
        <p>No sauces to display!</p>
      )}
    </div>
  );
}
