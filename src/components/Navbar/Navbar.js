import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <>
    <h1>NAVBAR</h1>
    <div>
      <ul id='menu'>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
      </ul>
    </div>
    </>
  );
};

export default Navbar;
