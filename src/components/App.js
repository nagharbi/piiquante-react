import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import CreateSauces from "../pages/CreateSauces";
import Register from "../pages/Register";
import Sauces from "../pages/Sauces";
import Header from "./Header";
import Connexion from "./Connexion";
import Sauce from "../pages/Sauce";
import Logout from "../pages/Logout";
import Redirection from "./Redirection";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/sauces"
          element={
            <Connexion>
              <Sauces />
            </Connexion>
          }
        />
        <Route
          path="/sauces/:id"
          element={
            <Connexion>
              <Sauce />
            </Connexion>
          }
        />
        <Route
          path="/sauces/create"
          element={
            <Connexion>
              <CreateSauces />
            </Connexion>
          }
        />
        <Route
          path="/register"
          element={
            <Redirection>
              <Register />
            </Redirection>
          }
        />
        <Route
          path="/login"
          element={
            <Redirection>
              <Login />
            </Redirection>
          }
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
