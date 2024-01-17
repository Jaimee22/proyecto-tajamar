import React, { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import './Login.css';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import LogoTechRiders from '../../../assets/img/escudo-negro1.png';
import ApiService from '../../../api/ApiService';
import { Toaster } from 'react-hot-toast';
import Loader from '../../../components/Loader/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false); // Nuevo estado para el indicador de carga

  const handleLogin = async () => {
    try {
      setLoading(true); // Establecer el estado de carga a true

      await ApiService.login(email, password);

      // Obtener el perfil del usuario después de iniciar sesión
      const perfilUsuario = await ApiService.getPerfilUsuario();
      
      // Redirigir según el idRole del usuario
      switch (perfilUsuario.idRole) {
        case 1:
          setRedirect('/pagina-admin');
          break;
        case 2:
          setRedirect('/pagina-profesor-responsable');
          break;
        case 3:
          setRedirect('/pagina-techriders');
          break;
        default:
          // Manejar otros roles o situaciones según sea necesario
          break;
      }
    } catch (error) {
      // console.error('Error al iniciar sesión:', error);
     
    } finally {
      setLoading(false); // Restablecer el estado de carga a false después de la solicitud
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

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
              <button type="button" className="login-form-btn" onClick={handleLogin} disabled={loading}>
                {loading ? <Loader /> : 'Iniciar Sesión'}
              </button>
            </div>
            <br/>
            <div className="text-center">
              <NavLink className="registrarse-text" to="/registro">
                <h4>Registrarse</h4>
                <i className="fa fa-long-arrow-right ml-5" aria-hidden="true"></i>
              </NavLink>
            </div>
          </form>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Login;
