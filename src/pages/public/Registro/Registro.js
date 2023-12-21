import React, { Component } from "react";
import "./Registro.css";
import axios from "axios";
import { FaRegUser ,FaLock, FaEnvelope, FaPhoneAlt, FaLinkedin } from "react-icons/fa";
// import {FaLocationDot} from 'react-icons/fa6'
import {BiSolidRename} from 'react-icons/bi'
import {MdRealEstateAgent } from 'react-icons/md'
import { getRoles } from "../../../api/Metodos";
import { getProvincias } from "../../../api/Metodos";


export default class Registro extends Component {
  state = {
    status: false,
    roles: [],
    provincias: []
  };

  nombre = React.createRef();
  apellidos = React.createRef();
  email = React.createRef();
  telefono = React.createRef();
  linkedin = React.createRef();
  password = React.createRef();
  idRole_s = React.createRef();
  idProvincia_s = React.createRef();
  idEmpresaCentro = React.createRef();
  estado = React.createRef();

  insertUsuario = (e) => {
    e.preventDefault();
    //Añadir aqui los valores del form 
    var idUsu = parseInt(this.idUsuario.current.value);
    var nom = this.nombre.current.value;
    var apell = this.apellidos.current.value;
    var mail = this.email.current.value;
    var telf = this.telefono.current.value;
    var linkdn = this.linkedin.current.value;
    var psswd = this.password.current.value;
    var idRol = parseInt(this.idRole.current.value);
    var idProv = parseInt(this.idProvincia.current.value);
    var idEmpCent = parseInt(this.idEmpresaCentro.current.value);
    var stado = parseInt(this.estado.current.value);

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


  async getProvinciasR(){
    try{
      const token = localStorage.getItem('token');
      console.log(token);
      const provincias = await getProvincias(token);
      this.setState({
        provincias
      })
    }catch(error){
      console.error('Error al obtener roles:', error);
    }
  }

  async componentDidMount() {
    getProvincias();
    try{
      const token = localStorage.getItem('token');
      console.log(token);
      const roles = await getRoles(token);
      this.setState({
        roles
      })
    }catch(error){
      console.error('Error al obtener roles:', error);
    }
  }

  render() {
    const {roles, provincias} = this.state;
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
                    ref={this.nombre}
                  />
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <FaRegUser size={15} />
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
                    <BiSolidRename size={15} />
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
                    <FaEnvelope size={15} />
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
                    <FaPhoneAlt size={15} />
                  </span>
                </div>

                <div className="contenedor-login-input">
                  <input
                    className="login-input"
                    placeholder="Linkedin"
                    type="text"
                    name="nombre"
                    ref={this.linkedin}
                  />
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <FaLinkedin size={15} />
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
                    <FaLock size={15} />
                  </span>
                </div>
                <div className="contenedor-login-input">
                  <select ref={this.idRole_s}>
                    <option value='' disabled>Selecciona un rol</option>
                    {roles.map(role => (
                      <option key={role.idRole} value={role.idRole}>
                        {role.tipoRole}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="contenedor-login-input">
                  <select ref={this.idProvincia_s}>
                    <option value='' disabled>Selecciona un rol</option>
                    {provincias.map(provincia => (
                      <option key={provincia.idProvincia} value={provincia.idProvincia}>
                        {provincia.nombreProvincia}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="contenedor-login-input">
                  <input
                    className="login-input"
                    placeholder="Provincia (con select)"
                    type="number"
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
                    placeholder="IdEmpresaCentro (con select)"
                    type="number"
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
                    placeholder="Estado"
                    type="number"
                    name="nombre"
                  />
                  <span className="focus-input"></span>
                  <span className="symbol-input">
                    <MdRealEstateAgent size={15} />
                  </span>
                </div>
              </div>
            </form>
            <div className="container-login-form-btn">
                  <button type="button" className="login-form-btn">
                    Iniciar Sesión
                  </button>
                </div>
          </div>
        </div>
      </div>
    );
  }
}
