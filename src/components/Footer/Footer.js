import React from 'react';
import './Footer.css';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="container">
      <footer className="custom-footer">
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="logo">
            <svg className="bi" width="30" height="24">
              <use xlinkHref="#custom-logo" />
            </svg>
          </a>
          <span className="company-text">&copy; 2023 FP + Professional Education</span>
        </div>

        <ul className="nav col-md-4 justify-content-center list-unstyled d-flex">
          <li className="ms-3">
            <a className="icon-link" href="#">
              <FaTwitter size={30} /> {/* Ajustar el tamaño */}
            </a>
          </li>
          <li className="ms-3">
            <a className="icon-link" href="#">
              <FaInstagram size={30} /> {/* Ajustar el tamaño */}
            </a>
          </li>
          <li className="ms-3">
            <a className="icon-link" href="#">
              <FaLinkedin size={30} /> {/* Ajustar el tamaño */}
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
