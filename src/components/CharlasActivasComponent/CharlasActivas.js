import React, { Component } from 'react';
import './CharlasActivas.css';
import ApiService from "../../api/ApiService";

export default class CharlasActivas extends Component {
  constructor() {
    super();
    this.state = {
      charlasActivas: [],
    };
  }

  componentDidMount() {
    this.fetchCharlasActivas();
  }

  async fetchCharlasActivas() {
    try {
      const charlas = await ApiService.getCharlasByTechrider();
      const charlasActivas = charlas.filter(charla => charla.estadoCharla === 'ACREDITADA' || charla.estadoCharla === 'COMPLETADA');
      this.setState({ charlasActivas });
    } catch (error) {
      console.error('Error al obtener las charlas:', error);
    }
  }

  render() {
    return (
      <div>
        <h1>Charlas Activas</h1>
        <ul>
          {this.state.charlasActivas.map(charla => (
            <li key={charla.idCharla}>
              <p>Descripción: {charla.descripcionCharla || 'No disponible'}</p>
              <p>Fecha de Charla: {charla.fechaCharla || 'No disponible'}</p>
              <p>Estado de Charla: {charla.estadoCharla || 'No disponible'}</p>
              {/* Agrega más campos según sea necesario */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
