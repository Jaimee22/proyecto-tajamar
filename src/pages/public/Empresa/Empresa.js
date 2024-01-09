import React, { Component, useState, useEffect } from 'react';
import './Empresa.css';
import ApiService from '../../../api/ApiService';

export default class Empresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresas: [],
    };
  }

  async componentDidMount() {
    try {
      // Llamada al método del servicio para obtener empresas
      const empresasData = await ApiService.getEmpresas();
      this.setState({ empresas: empresasData });
    } catch (error) {
      console.error('Error al obtener empresas:', error.message);
    }
  }

  render() {
    return (
      <div>
        <h1>Empresas</h1>
        <ul>
          {this.state.empresas.map((empresa) => (
            <li key={empresa.idEmpresaCentro}>{empresa.nombre}</li>
          ))}
        </ul>
      </div>
    );
  }
}
