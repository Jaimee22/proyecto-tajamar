import React, { Component } from 'react';
import ApiService from '../../../api/ApiService';
import schoolsImage from '../../../assets/img/banner-centros.jpg';
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
      <div className='container-fluid p-0'>
        <div className='banner-container mb-5'>
          <img src={schoolsImage} alt='Centros' className='w-100 banner-image' />
          <div className='overlay'></div>
          <div className='banner-text text-center text-light'>
            <h1 className='mb-4 font-weight-bold display-4 fw-bold'>Centros Colaboradores</h1>
            <p className='mb-4 font-weight-bold lead fw-bold'>
              Bienvenido a TechRiders, tu socio en educación. Trabajamos con los siguientes centros educativos para ofrecer experiencias educativas innovadoras y de alta calidad.
            </p>
            <button className='btn btn-dark btn-add-center btn-lg rounded-0 fw-bold'>
              Añadir Centro
              <span className='ms-2'>&#10132;</span>
            </button>
          </div>
        </div>

        <div className='row mt-5'>
          {this.state.centros.map((centro) => (
            <div key={centro.idEmpresaCentro} className='col-md-6 mb-4'>
              <div className='card'>
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
            </div>
          ))}
        </div>
      </div>
    );
  }
}
