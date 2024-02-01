import React, { Component } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import ApiService from '../../../api/ApiService';
import Sidebar from '../../../components/Sidebar/Sidebar';
import './TechRider.css'
import AccessDenied from '../../../components/AccesDenied/AccessDenied';
import Loader from '../../../components/Loader/Loader';

class TechRider extends Component {
  state = {
    usuario: {},
    loading: true
  };

  async componentDidMount() {
    try {
      const perfilUsuario = await ApiService.getPerfilUsuario();
      this.setState({ usuario: perfilUsuario, loading: false });
      this.setState({ usuario: perfilUsuario });
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      this.setState({ loading: false });
    }
  }

  handleLogout = () => {
    localStorage.removeItem('token');

    window.location.href = '/';
  };

  render() {
    const { usuario, loading } = this.state;

    if (loading) {
      return <Loader />;
    }

    const tieneAcceso = usuario.idRole === 3;

    return (
      <>
        {tieneAcceso ? (
          //Añadir aqui un bienvenido techrider con el nombre
          <>
            <Sidebar />/
          </>
        ) : (
          <AccessDenied/>
        )}
      </>
    );
  }
}

export default TechRider;
