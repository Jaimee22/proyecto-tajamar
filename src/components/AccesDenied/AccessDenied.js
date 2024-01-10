import React, { Component } from "react";
import "./AccessDenied.css";
import { RiProhibitedLine } from "react-icons/ri";

export default class AccessDenied extends Component {
  render() {
    return (
      <div className="acceso-denegado-container">
        <h1>
            <RiProhibitedLine className="icono-cancelar" size={150} color='#d9534f'/>
        </h1>
        <h1 className="denied-title">Acceso Denegado</h1>
        <p className="denied-message">
          Oops! No tienes permisos para acceder a esta página.
        </p>
      </div>
    );
  }
}
