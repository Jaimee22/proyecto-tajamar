import React, { Component } from 'react';
import ApiService from '../../../api/ApiService';
import Loader from '../../../components/Loader/Loader';
import AccessDenied from '../../../components/AccesDenied/AccessDenied';
import GestionCentros from '../../../components/GestionCentros/GestionCentros';
import BotonVolver from '../../../components/BotonVolver/BotonVolver';
import TituloAdminPanel from '../../../components/TituloAdminPanel/TituloAdminPanel';

class AdminGestionCentro extends Component {
  state = {
    usuario: {},
    loading: true, // Nuevo estado para controlar la carga
  };

  async componentDidMount() {
    try {
      const perfilUsuario = await ApiService.getPerfilUsuario();
      this.setState({ usuario: perfilUsuario, loading: false }); // Actualiza el estado con el perfil del usuario y establece loading a false
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      this.setState({ loading: false }); // Manejar el error y establecer loading a false
    }
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  render() {
    const { usuario, loading } = this.state;

    if (loading) {
      // Muestra un mensaje de carga mientras se obtiene el perfil del usuario
      return <Loader />;
    }

    const tieneAcceso = usuario.idRole === 1;

    return (
      <div>
        {tieneAcceso ? (
          <>
            <TituloAdminPanel texto="Gestionar Centros" color="#84abca" />
            <GestionCentros />
          </>
        ) : (
          <AccessDenied/>
        )}
      </div>
    );
  }
}

export default AdminGestionCentro;