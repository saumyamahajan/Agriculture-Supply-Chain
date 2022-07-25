import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home <span className="sr-only"></span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Farmer">
              Farmers
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/About">
                About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Contact">
              Contact Us
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Test">
              Test using class
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Test1">
              Test1 using function
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/fileupload">
              Test file upload
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;