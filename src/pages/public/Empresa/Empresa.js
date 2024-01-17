import React, { Component } from 'react';
import ApiService from '../../../api/ApiService';
import schoolsImage from '../../../assets/img/banner-centros.jpg';
// import './Empresa.css';

export default class Empresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresas: [],
    };
  }

  async componentDidMount() {
    try {
      const empresasData = await ApiService.getEmpresas();
      this.setState({ empresas: empresasData });
    } catch (error) {
      console.error('Error al obtener empresas:', error.message);
    }
  }

  render() {
    return (
      <div className='container-fluid p-0'>
        <div className='banner-container mb-5'>
          <img src={schoolsImage} alt='Empresas' className='w-100 banner-image' />
          <div className='overlay'></div>
          <div className='banner-text text-center text-light'>
            <h1 className='mb-4 font-weight-bold display-4 fw-bold'>Empresas Colaboradoras</h1>
            <p className='mb-4 font-weight-bold lead fw-bold'>
              Bienvenido a TechRiders, tu socio en negocios. Colaboramos con las siguientes empresas para ofrecer soluciones innovadoras y de alta calidad.
            </p>
            <button className='btn btn-dark btn-add-center btn-lg rounded-0 fw-bold'>
              Añadir Empresa
              <span className='ms-2'>&#10132;</span>
            </button>
          </div>
        </div>

        <div className='container mt-5'>
          <div className='row'>
            {this.state.empresas.map((empresa) => (
              <div key={empresa.idEmpresaCentro} className='col-md-6 mb-4'>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>{empresa.nombre}</h5>
                    <p className='card-text'>
                      <strong>Dirección:</strong> {empresa.direccion}
                    </p>
                    <p className='card-text'>
                      <strong>Teléfono:</strong> {empresa.telefono}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
