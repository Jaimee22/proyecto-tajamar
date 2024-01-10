import React, { Component } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import ApiService from '../../../api/ApiService'; // Ajusta la ruta según la estructura de tu proyecto
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
      // Obtén el perfil del usuario utilizando el método del servicio
      const perfilUsuario = await ApiService.getPerfilUsuario();
      this.setState({ usuario: perfilUsuario, loading: false });
      // Actualiza el estado con el perfil del usuario
      this.setState({ usuario: perfilUsuario });
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      this.setState({ loading: false });
    }
  }

  handleLogout = () => {
    // Elimina el token del localStorage
    localStorage.removeItem('token');

    // Redirige a la página de inicio
    window.location.href = '/';
  };

  render() {
    const { usuario, loading } = this.state;

    if (loading) {
      return <Loader />;
    }

    // Verifica si el usuario tiene el rol necesario (en este caso, rol 1)
    const tieneAcceso = usuario.idRole === 3;

    return (
      <>

        {/* Verifica si el usuario tiene acceso al contenido */}
        {tieneAcceso ? (
          // Contenido de la página para el usuario con rol 1
          <>
            {/* <h1>TechRider</h1> */}
            {/* ... (otro contenido específico para el rol 1) */}
            <Sidebar />
            {/* <NavLink to="/login" onClick={this.handleLogout} className="nav-link">
              <FaSignOutAlt size={20} /> Cerrar Sesión
            </NavLink> */}
          </>
        ) : (
          // Mensaje para usuarios que no tienen acceso
          <AccessDenied/>
        )}
      </>
    );
  }
}

export default TechRider;
