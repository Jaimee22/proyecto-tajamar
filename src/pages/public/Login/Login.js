import React, { useState } from 'react';
import './Login.css';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import LogoTechRiders from '../../../assets/img/escudo-negro1.png';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://apitechriders.azurewebsites.net/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.response;
        console.log('Token:', token);
        localStorage.setItem('token', token);
        alert('Inicio de sesión exitoso. Token almacenado.');

      } else {
        
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div className="container-principal">
      <div className="container-login-principal">
        <div className="container-login-mediano">
          <div className="foto-login">
            <img src={LogoTechRiders} alt="img-logo-techriders" style={{ width: '35rem' }} />
          </div>

          <form className="form-login">
            <span className="form-title">Iniciar Sesión</span>

            <div className="contenedor-login-input">
              <input
                className="login-input"
                type="text"
                name="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FaEnvelope size={15} />
              </span>
            </div>

            <div className="contenedor-login-input">
              <input
                className="login-input"
                type="password"
                name="pass"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FaLock size={15} />
              </span>
            </div>

            <div className="container-login-form-btn">
              <button type="button" className="login-form-btn" onClick={handleLogin}>
                Iniciar Sesión
              </button>
            </div>

            <div className="text-center">
              <a className="registrarse-text" href="/registro">
                Registrarse
                <i className="fa fa-long-arrow-right ml-5" aria-hidden="true"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
