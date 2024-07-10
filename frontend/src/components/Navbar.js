// src/components/Navbar.js

import React from 'react';
import '../styles/Navbar.css'; // Import CSS file for styling
import {Link} from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Billinvent</h1>
      </div>
      <ul className="navbar-links">
        <li><Link to='/'>Billing</Link></li>
        <li><Link to='/inventory'>Inventory</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
