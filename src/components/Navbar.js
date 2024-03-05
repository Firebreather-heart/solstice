import React from "react";
import "./navbar.css";
import BudgetIcon from "../assets/budget-icon.jpg";

const handleLogout = () => {
  window.location.href = "/logout";
};

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="brand-container">
          <img
            alt="Budget App"
            src={BudgetIcon}
            width="30"
            height="30"
            className="brand-icon"
          />
          <h1 className="brand">Solstice Budget App</h1>
        </div>
        <div className="buttons">
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
