import React, { Component } from "react";
import "./Registro.css";
import { FaRegUser, FaLock, FaEnvelope, FaPhoneAlt, FaLinkedin } from "react-icons/fa";
import { TiBusinessCard } from "react-icons/ti";
import { BiSolidRename } from 'react-icons/bi';
import { MdRealEstateAgent } from 'react-icons/md';
import { IoBusinessSharp } from "react-icons/io5";
import { GrMap } from "react-icons/gr";
import ApiService from '../../../api/ApiService';

export default class Registro extends Component {
  state = {
    status: false,
    provincias: [],
    empresasCentros: []
  };

  nombre = React.createRef();
  apellidos = React.createRef();
  email = React.createRef();
  telefono = React.createRef();
  linkedin = React.createRef();
  password = React.createRef();
  idRole_s = React.createRef();
  idProvincia_s = React.createRef();
  idEmpresaCentro_s = React.createRef();

  insertUsuario = async (e) => {
    e.preventDefault();
    var nom = this.nombre.current.value;
    var apell = this.apellidos.current.value;
    var mail = this.email.current.value;
    var telf = this.telefono.current.value;
    var linkdn = this.linkedin.current.value;
    var psswd = this.password.current.value;
    var idRol = parseInt(this.idRole_s.current.value);
    var idProv = parseInt(this.idProvincia_s.current.value);
    var idEmpCent = parseInt(this.idEmpresaCentro_s.current.value);
    var stado = 1;

    var usuario = {
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

    try {
      const response = await ApiService.insertUser(usuario);
      console.log('Datos del response (Inserción de Usuario):', response);
      // Puedes manejar el éxito aquí, por ejemplo, mostrando un mensaje al usuario.
    } catch (error) {
      console.error('Error al insertar usuario:', error);
      // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje de error al usuario.
    }

    this.setState({
      status: true,
    });
  };

  async componentDidMount() {
    try {
      const provincias = await ApiService.getProvincias();
      const empresasCentros = await ApiService.getEmpresasCentro();

      this.setState({
        provincias,
        empresasCentros
      });
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

  render() {
    const { provincias, empresasCentros } = this.state;
    return (
      <div className="container-principal">
        <h1 id="title-registrarse">Registrarse</h1>
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
                    ref={this.nombre}
                  />
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <FaRegUser size={20} />
                  </span>
                </div>

                <div className="contenedor-login-input">
                  <input
                    className="login-input"
                    placeholder="Apellidos"
                    type="text"
                    name="apellidos"
                    ref={this.apellidos}
                  />
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <BiSolidRename size={23} />
                  </span>
                </div>

                <div className="contenedor-login-input">
                  <input
                    className="login-input"
                    placeholder="Email"
                    type="text"
                    name="email"
                    ref={this.email}
                  />
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <FaEnvelope size={20} />
                  </span>
                </div>

                <div className="contenedor-login-input">
                  <input
                    className="login-input"
                    placeholder="Teléfono"
                    type="text"
                    name="telefono"
                    ref={this.telefono}
                  />
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <FaPhoneAlt size={20} />
                  </span>
                </div>
              </div>

              <div className="form-login">
                <div className="contenedor-login-input">
                  <input
                    className="login-input"
                    type="password"
                    name="pass"
                    placeholder="Contraseña"
                    ref={this.password}
                  />
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <FaLock size={20} />
                  </span>
                </div>
                <div className="contenedor-login-input">
                  <select  className="login-input" ref={this.idRole_s}>
                    <option value='' disabled selected>Selecciona un rol</option>
                    <option value='2'>PROFESOR / REPRESENTANTE</option>
                    <option value='3'>TECHRIDERS</option>
                  </select>
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <TiBusinessCard size={25} />
                  </span>
                </div>
                <div className="contenedor-login-input">
                  <select  className="login-input" ref={this.idProvincia_s}>
                    <option value='' disabled selected>Selecciona una provincia</option>
                    {provincias.map(provincia => (
                      <option key={provincia.idProvincia} value={provincia.idProvincia}>
                        {provincia.nombreProvincia}
                      </option>
                    ))}
                  </select>
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <GrMap size={25} />
                  </span>
                </div>
                <div className="contenedor-login-input">
                  <select  className="login-input" ref={this.idEmpresaCentro_s}>
                    <option value='' disabled selected>Selecciona una empresa o centro</option>
                    {empresasCentros.map(empresaCentro => (
                      <option key={empresaCentro.idEmpresaCentro} value={empresaCentro.idEmpresaCentro}>
                        {empresaCentro.nombre}
                      </option>
                    ))}
                  </select>
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <IoBusinessSharp size={23} />
                  </span>
                </div>
              </div>
            </form>
            <div className="container-login-form-linkedin">
              <input
                className="login-input"
                placeholder="Linkedin"
                type="text"
                name="nombre"
                ref={this.linkedin}
              />
              <span className="focus-input"></span>
              <span id="symbol-linkedin">
                <FaLinkedin size={23} />
              </span>
            </div>
            <div className="container-login-form-btn">
              <button type="button" className="login-form-btn" onClick={this.insertUsuario}>
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
