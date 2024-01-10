import React, { Component } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import AdminPanel from '../../../components/AdminPanel/AdminPanel'
import ApiService from '../../../api/ApiService'; // Ajusta la ruta según la estructura de tu proyecto
import Loader from '../../../components/Loader/Loader';
import AccessDenied from '../../../components/AccesDenied/AccessDenied';

class Admin extends Component {
  state = {
    usuario: {},
    loading: true,
  };

  async componentDidMount() {
    try {
      // Obtén el perfil del usuario utilizando el método del servicio
      const perfilUsuario = await ApiService.getPerfilUsuario();
      this.setState({ usuario: perfilUsuario, loading: false }); // Actualiza el estado con el perfil del usuario y establece loading a false

    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      this.setState({ loading: false }); // Manejar el error y establecer loading a false
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
    const tieneAcceso = usuario.idRole === 1;

    return (
      <div>

        {/* Verifica si el usuario tiene acceso al contenido */}
        {tieneAcceso ? (
          // Contenido de la página para el usuario con rol 1
          <>
            {/* <h1>Admin</h1> */}
            <AdminPanel />
            {/* ... (otro contenido específico para el rol 1) */}
            {/* <NavLink to="/login" onClick={this.handleLogout} className="nav-link">
              <FaSignOutAlt size={20} /> Cerrar Sesión
            </NavLink> */}
          </>
        ) : (
          // Mensaje para usuarios que no tienen acceso
          <AccessDenied/>
        )}
      </div>
    );
  }
}

export default Admin;
