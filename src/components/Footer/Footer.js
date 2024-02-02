import React from 'react';
import './Footer.css';
import { FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';
import LogoTajamarFooter from '../../assets/img/escudo-negativo-tajamar.png';

const Footer = () => {
  return (
    <footer className="custom-footer position-static">
      <div className="col-md-5">
        <a href="/" className="logo">
          <img src={LogoTajamarFooter} alt='logo_tajamar'/>
        </a>
      </div>

      <div className='col-md-3 text-center'>
        <p className="company-text fw-bold">&copy; 2024 FP + Professional Education</p><br/>
        <span className='info-footer'><strong className='white'>Dirección:</strong> Calle Pío Felipe 12, 28038,  Madrid </span>
        <span className='info-footer'><strong className='white'>Teléfonos:</strong> 91 757 18 17 / 91 478 34 98</span>
      </div>

      <ul className="nav col-md-4 justify-content-center list-unstyled d-flex justify-content-md-end">
        <li className="ms-3">
          <a className="icon-link" href="https://twitter.com/TechRiders_es">
            <FaTwitter size={30} />
          </a>
        </li>
        <li className="ms-3">
          <a className="icon-link" href="www.youtube.com/@TechRiders_es">
            <FaYoutube size={30} />
          </a>
        </li>
        <li className="ms-3">
          <a className="icon-link" href="https://www.canva.com/design/DAF7npwWdIo/N3gEx6JulLps8DyEBU2U9Q/view?utm_content=DAF7npwWdIo&utm_campaign=designshare&utm_medium=link&utm_source=editor#1">
            <FaLinkedin size={30} />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

