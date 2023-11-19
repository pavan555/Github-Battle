import * as React from "react";
import { NavLink } from "react-router-dom";
import { moonIcon, sunIcon } from "./icons";

export const Nav = ({ theme, toggleTheme }) => {
  return (
    <nav className="split">
      <NavLink
        to="/"
        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
      >
        Github Battle
      </NavLink>
      <ul className="row">
        <li className="split">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
          >
            Popular
          </NavLink>
        </li>
        <li className="split">
          <NavLink
            to="/battle"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
          >
            Battle
          </NavLink>
        </li>
        <li className="split">
          <button className="btn secondary icon" onClick={toggleTheme}>
            {theme === "light" ? moonIcon() : sunIcon()}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
