import React, { useState } from 'react';
import './Login.css';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import LogoTechRiders from '../../../assets/img/escudo-negro1.png';
import ApiService from '../../../api/ApiService'; // Importa el servicio ApiService
import toast, { Toaster } from 'react-hot-toast'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await ApiService.login(email, password); // Utiliza el método login de ApiService
    } catch (error) {
      // Puedes manejar el error aquí si es necesario
      console.error('Error al iniciar sesión:', error);
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

      <Toaster />
    </div>
  );
};

export default Login;
