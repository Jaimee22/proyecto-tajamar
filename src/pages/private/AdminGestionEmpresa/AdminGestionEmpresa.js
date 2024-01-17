import React, { Component } from 'react';
import ApiService from '../../../api/ApiService';
import Loader from '../../../components/Loader/Loader';
import AccessDenied from '../../../components/AccesDenied/AccessDenied';
import GestionEmpresas from '../../../components/GestionEmpresas/GestionEmpresas';

class AdminGestionEmpresa extends Component {
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
            <h1>AdminGestionEmpresa</h1>
            <GestionEmpresas />
          </>
        ) : (
          <AccessDenied/>
        )}
      </div>
    );
  }
}

export default AdminGestionEmpresa;