import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import "../styles/Bar.css";

const Bar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="bar">
      <div className="bar-content">
        <a href="/" className="bar-logo">
          <IoBookOutline className="book-icon" />
        </a>

        <div className={`bar-links ${menuOpen ? "open" : ""}`}>
          <a href="/">Home</a>
          <a href="/profile">Profile</a>
          <a href="/about">About</a>
        </div>

        <div
          className="user-icon"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
        >
          <FaRegUserCircle />
          {userMenuOpen && (
            <div className="user-dropdown">
              <a href="/logout">Logout</a>
            </div>
          )}
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div>&#9776;</div>
        </div>
      </div>
    </div>
  );
};

export default Bar;
