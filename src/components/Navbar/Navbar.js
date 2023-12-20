import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <>
      <nav className="navbar fixed-top bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="#">TechRiders</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item dropdown">
          <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Seguridad
          </NavLink>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="/login">Login</NavLink></li>
            <li><NavLink className="dropdown-item" to="/registro">Registro</NavLink></li>
          </ul>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/centros">Centros</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/empresas">Empresas</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/techriders">TechRiders</NavLink>
        </li>
        <li className="nav-item dropdown">
          <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Privado
          </NavLink>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="/centros-private">Centros</NavLink></li>
            <li><NavLink className="dropdown-item" to="/empresas-private">Empresas</NavLink></li>
            <li><NavLink className="dropdown-item" to="/techriders-private">TechRiders</NavLink></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  );
};

export default Navbar;
