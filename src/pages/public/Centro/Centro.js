import React, { Component } from 'react';
import ApiService from '../../../api/ApiService';
import './Centro.css';

export default class Centros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centros: [],
    };
  }

  async componentDidMount() {
    try {
      const centrosData = await ApiService.getCentros();
      this.setState({ centros: centrosData });
    } catch (error) {
      console.error('Error al obtener centros:', error.message);
    }
  }

  render() {
    return (
      <>
        <div className='inicio-home-container'>
          <div className='inicio-home-info'>
            <h1 id='title-home'>CENTROS</h1>
            <h3 id='text-home'>
              Bienvenido a TechRiders.
              <br/>Colaboramos con los siguientes centros para ofrecer soluciones innovadoras y de alta calidad.
            </h3>
          </div>
        </div>

        <div className='container mt-5'>
          <div className='card-container'>
            {this.state.centros.map((centro) => (
              <div key={centro.idCentro} className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{centro.nombre}</h5>
                  <p className='card-text'>
                    <strong>Dirección:</strong> {centro.direccion}
                  </p>
                  <p className='card-text'>
                    <strong>Teléfono:</strong> {centro.telefono}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
