import React, { Component } from 'react';
import ApiService from '../../../api/ApiService';
import './Centro.css';
import { Navigate, NavLink } from 'react-router-dom';


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
      </>
    );
  }
}
