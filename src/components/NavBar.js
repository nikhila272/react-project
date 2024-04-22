import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function NavBar({ searchTerm, onSearch }) {
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn); 

  return (
    <header className="header">
      <NavLink to="/" className="logo" onClick={() => window.location.reload()}>
        ProductPulse
      </NavLink>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <nav className="navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>

        {isUserLoggedIn ? ( 
          <NavLink to="/logout">Logout</NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
}
