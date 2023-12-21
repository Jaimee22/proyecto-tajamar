import React, { Component } from "react";
import "./Registro.css";
import axios from "axios";
import { FaLock, FaEnvelope } from "react-icons/fa";
import LogoTechRiders from "../../../assets/img/escudo-negro1.png";

export default class Registro extends Component {
  state = {
    status: false,
  };
  insertUsuario = (e) => {
    e.preventDefault();
    //Añadir aqui los valores del form
    var idUsu = 0;
    var nom = "";
    var apell = "";
    var mail = "";
    var telf = "";
    var linkdn = "";
    var psswd = "";
    var idRol = 0;
    var idProv = 0;
    var idEmpCent = 0;
    var stado = 0;

    var usuario = {
      idUsuario: idUsu,
      nombre: nom,
      apellidos: apell,
      email: mail,
      telefono: telf,
      linkedIn: linkdn,
      password: psswd,
      idRole: idRol,
      idProvincia: idProv,
      idEmpresaCentro: idEmpCent,
      estado: stado,
    };

    var url = "https://apitechriders.azurewebsites.net/api/usuarios";
    axios.post(url, usuario).then((response) => {
      this.setState({
        status: true,
      });
    });
  };

  render() {
    return (
      <div className="container-principal">
        <div className="container-login-principal">
          <div className="container-login-mediano">
            <form className="form-flex">
              <div className="form-login">
                <div className="contenedor-login-input">
                  <input
                    className="login-input"
                    placeholder="Nombre"
                    type="text"
                    name="nombre"
                  />
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <FaEnvelope size={15} />
                  </span>
                </div>

                <div className="contenedor-login-input">
                  <input
                    className="login-input"
                    placeholder="Email"
                    type="text"
                    name="email"
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
                  />
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <FaLock size={15} />
                  </span>
                </div>
                <div className="contenedor-login-input">
                  <input
                    className="login-input"
                    placeholder="Nombre"
                    type="text"
                    name="nombre"
                  />
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <FaEnvelope size={15} />
                  </span>
                </div>
                <div className="contenedor-login-input">
                  <input
                    className="login-input"
                    placeholder="Nombre"
                    type="text"
                    name="nombre"
                  />
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <FaEnvelope size={15} />
                  </span>
                </div>
              </div>
              <div className="form-login">
                <div className="contenedor-login-input">
                  <input
                    className="login-input"
                    placeholder="Nombre"
                    type="text"
                    name="nombre"
                  />
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <FaEnvelope size={15} />
                  </span>
                </div>

                <div className="contenedor-login-input">
                  <input
                    className="login-input"
                    placeholder="Email"
                    type="text"
                    name="email"
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
                  />
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <FaLock size={15} />
                  </span>
                </div>
                <div className="contenedor-login-input">
                  <input
                    className="login-input"
                    placeholder="Nombre"
                    type="text"
                    name="nombre"
                  />
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <FaEnvelope size={15} />
                  </span>
                </div>
                <div className="contenedor-login-input">
                  <input
                    className="login-input"
                    placeholder="Nombre"
                    type="text"
                    name="nombre"
                  />
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <FaEnvelope size={15} />
                  </span>
                </div>
                <div className="container-login-form-btn">
                  <button type="button" className="login-form-btn">
                    Iniciar Sesión
                  </button>
                </div>
                <div className="text-center">
                  <a className="registrarse-text" href="/registro">
                    Registrarse
                    <i
                      className="fa fa-long-arrow-right ml-5"
                      aria-hidden="true"
                    ></i>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
