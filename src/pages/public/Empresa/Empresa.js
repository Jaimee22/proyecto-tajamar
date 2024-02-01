import React, { Component } from 'react';
import ApiService from '../../../api/ApiService';
import schoolsImage from '../../../assets/img/banner-centros.jpg';
import './Empresa.css';
import { Navigate, NavLink } from 'react-router-dom';

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
      <>
      <div className='inicio-home-container'>
          <div className='inicio-home-info'>
            <h1 id='title-home'>EMPRESAS</h1>
            <h3 id='text-home'>
              Bienvenido a TechRiders.
              <br />Colaboramos con las siguientes Empresas para ofrecer soluciones innovadoras y de alta calidad.
            </h3>
            <NavLink className="btn btn-dark" to="/login">
                <h4>Registrar Empresa</h4>
                <i className="fa fa-long-arrow-right ml-5" aria-hidden="true"></i>
              </NavLink>
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
      </>
    );
  }
}
