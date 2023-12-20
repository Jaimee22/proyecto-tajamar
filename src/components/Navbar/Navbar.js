import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoTechRidersNavbar from '../../assets/img/logo-navbar-techriders.png'
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark sticky-top" data-bs-theme="dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={LogoTechRidersNavbar} alt="Logo" style={{height:'5rem',paddingTop:'1rem'}}/>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Seguridad
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/registro">
                      Registro
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/centros">
                  Centros
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/empresas">
                  Empresas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/techriders">
                  TechRiders
                </NavLink>
              </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Privado
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li>
                    <NavLink className="dropdown-item" to="/centros-private">
                      Centros
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/empresas-private">
                      Empresas
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/techriders-private">
                      TechRiders
                    </NavLink>
                  </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
