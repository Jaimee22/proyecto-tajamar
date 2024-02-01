import React, { Component } from 'react'
import ApiService from '../../../api/ApiService';
import schoolsImage from '../../../assets/img/banner-centros.jpg';
import './TechRider.css'
import { CiLinkedin } from "react-icons/ci";
import { Navigate, NavLink } from 'react-router-dom';

export default class TechRider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      techriders: [],
    };
  }

  async componentDidMount() {
    try {
      const techData = await ApiService.getTechRidersActivos();
      this.setState({ techriders: techData });
    } catch (error) {
      console.error('Error al obtener techriders:', error.message);
    }
  }

  render() {
    return (
      <>
      <div className='inicio-home-container'>
          <div className='inicio-home-info'>
            <h1 id='title-home'>TECHRIDERS</h1>
            <h3 id='text-home'>
              Bienvenido a TechRiders.
              <br />Colaboramos con los siguientes TechRiders.
            </h3>
            <NavLink className="btn btn-dark" to="/login">
                <h4>Registrar Tech Rider</h4>
                <i className="fa fa-long-arrow-right ml-5" aria-hidden="true"></i>
              </NavLink>
          </div>
        </div>

        <div className='container mt-5'>
          <div className='row'>
          {this.state.techriders.map((techrider) => (
              <div key={techrider.idTechRider} className='col-md-6 mb-4'>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>{techrider.techRider}</h5>
                    <p className='card-text'>
                      <strong>Email:</strong> {techrider.email}
                    </p>  
                    <p className='card-text'>
                      <strong>Provincia:</strong> {techrider.provinciaTechRider}
                    </p>                                   
                    <p className='card-text'>
                      <strong>Empresa:</strong> {techrider.empresa}
                    </p>
                    <p className='card-text'>
                      {/* probarlo con un <a/> */}
                      <CiLinkedin
                        size={50}
                        onClick={() => window.open(techrider.linkedIn, "_blank")}
                        style={{ cursor: "pointer" }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}
