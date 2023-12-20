import React from 'react'
import './Login.css'
import {FaLock, FaEnvelope} from 'react-icons/fa';
import LogoTechRiders from '../../../assets/img/escudo-negro1.png';


const Login = () => {
  return (
    <div className="container-principal">
      <div className="container-login-principal">
        <div className="container-login-mediano">
          <div className="foto-login">
            <img src={LogoTechRiders} alt="img-logo-techriders" style={{width:'35rem'}}/>
          </div>

          <form className="form-login">
            <span className="form-title">
                Iniciar Sesión
            </span>

            <div className="contenedor-login-input">
              <input className="login-input" type="text" name="email" placeholder="Correo Electrónico" />
              <span className="focus-input"></span>
              <span className="symbol-input">
                <FaEnvelope size={15}/>
              </span>
            </div>

            <div className="contenedor-login-input">
              <input className="login-input" type="password" name="pass" placeholder="Contraseña" />
              <span className="focus-input"></span>
              <span className="symbol-input">
              <FaLock size={15}/>
              </span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn">
                Inciar Sesión
              </button>
            </div>

            {/* <div className="text-center">
              <span className="txt1">
                Has olvidado
              </span>
              <a className="registrarse-text" href="#">
                Nombre de Usuario / Contraseña?
              </a>
            </div> */}

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
