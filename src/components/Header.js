import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

const Header = () => {
  return (
    <header>
      <h1 className="title">Movie Warehouse</h1>
      <nav className="nav">
        <NavLink to="/">Acceuil</NavLink>
        <NavLink to="/preference">Coups de cœur</NavLink>
      </nav>
    </header>
  );
};

export default Header;
