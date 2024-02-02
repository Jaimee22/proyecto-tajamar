// Empresa.js
import React, { Component } from 'react';
import ApiService from '../../../api/ApiService';
import schoolsImage from '../../../assets/img/banner-centros.jpg';
import './Empresa.css';
import { NavLink } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';  // Ajusta la ruta según la ubicación real del componente Loader

export default class Empresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresas: [],
      loading: true,  // Agrega un estado para controlar si los datos se están cargando
    };
  }

  async componentDidMount() {
    try {
      const empresasData = await ApiService.getEmpresas();
      this.setState({ empresas: empresasData, loading: false });  // Actualiza el estado cuando los datos se cargan
    } catch (error) {
      console.error('Error al obtener empresas:', error.message);
      this.setState({ loading: false });  // Maneja el estado si hay un error al cargar los datos
    }
  }

  render() {
    return (
      <>
        <div className='inicio-home-container3'>
          <div className='inicio-home-info'>
            <h1 id='title-home'>EMPRESAS</h1>
            <h3 id='text-home'>
              Bienvenido a TechRiders.
              <br />Colaboramos con las siguientes empresas para ofrecer charlas innovadoras y de alta calidad.
            </h3>
            <NavLink className="btn btn-dark" to="/login">
              <h4>Registrar Empresa</h4>
              <i className="fa fa-long-arrow-right ml-5" aria-hidden="true"></i>
            </NavLink>
          </div>
        </div>

        {this.state.loading ? (  // Muestra el Loader si los datos están cargando
          <Loader />
        ) : (
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
        )}
      </>
    );
  }
}
