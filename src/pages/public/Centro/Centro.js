import React, { Component, useState, useEffect } from 'react';
import './Centro.css';
import ApiService from '../../../api/ApiService';

export default class Centros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centros: [],
    };
  }

  async componentDidMount() {
    try {
      // Llamada al método del servicio para obtener centros
      const centrosData = await ApiService.getCentros();
      this.setState({ centros: centrosData });
    } catch (error) {
      console.error('Error al obtener centros:', error.message);
    }
  }

  render() {
    return (
      <div className='container'>
        <h1>Centros</h1>
        <ul>
          {this.state.centros.map((centro) => (
            <li key={centro.idEmpresaCentro}>{centro.nombre}</li>
          ))}
        </ul>
      </div>
    );
  }
}
