import React, { Component } from 'react';
import ApiService from '../../../api/ApiService';
import './Centro.css';
import { NavLink } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';  // Ajusta la ruta según la ubicación real del componente Loader

export default class Centros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centros: [],
      loading: true,  // Agrega un estado para controlar si los datos se están cargando
    };
  }

  async componentDidMount() {
    try {
      const centrosData = await ApiService.getCentros();
      this.setState({ centros: centrosData, loading: false });  // Actualiza el estado cuando los datos se cargan
    } catch (error) {
      console.error('Error al obtener centros:', error.message);
      this.setState({ loading: false });  // Maneja el estado si hay un error al cargar los datos
    }
  }

  render() {
    return (
      <>
        <div className='inicio-home-container2'>
          <div className='inicio-home-info'>
            <h1 id='title-home'>CENTROS</h1>
            <h3 id='text-home'>
              Bienvenido a TechRiders.
              <br />Colaboramos con los siguientes centros para ofrecer charlas innovadoras y de alta calidad.
            </h3>           
            <NavLink className="btn btn-dark" to="/login">
              <h4>Registrar Centro</h4>
              <i className="fa fa-long-arrow-right ml-5" aria-hidden="true"></i>
            </NavLink>
          </div>
        </div>

        {this.state.loading ? (  // Muestra el Loader si los datos están cargando
          <Loader />
        ) : (
          <div className='container mt-5'>
            <div className='row'>
              {this.state.centros.map((centro) => (
                <div key={centro.idCentro} className='col-md-4'>
                  <div className='card mb-4'>
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
        )}
      </>
    );
  }
}
