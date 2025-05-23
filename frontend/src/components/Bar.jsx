import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { useUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import "../styles/Bar.css";

const Bar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { avatarPreview } = useUser();

  return (
    <div className="bar">
      <div className="bar-content">
        <Link to="/" className="bar-logo">
          <IoBookOutline className="book-icon" />
        </Link>

        <div className={`bar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/about">About</Link>
        </div>

        <div className="user-icon" onClick={() => setUserMenuOpen(!userMenuOpen)}>
          {avatarPreview ? (
            <img src={avatarPreview} alt="User Avatar" className="bar-avatar" />
          ) : (
            <FaRegUserCircle />
          )}
          {userMenuOpen && (
            <div className="user-dropdown">
              <Link to="/logout">Logout</Link>
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
