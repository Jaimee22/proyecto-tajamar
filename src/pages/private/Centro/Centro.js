import React, { Component } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import ApiService from '../../../api/ApiService'; // Ajusta la ruta según la estructura de tu proyecto
import './Centro.css'
import AccessDenied from '../../../components/AccesDenied/AccessDenied';
import SidebarProfesor from '../../../components/SidebarProfesor/SidebarProfesor'

class Centro extends Component {
  state = {
    usuario: {},
  };

  async componentDidMount() {
    try {
      // Obtén el perfil del usuario utilizando el método del servicio
      const perfilUsuario = await ApiService.getPerfilUsuario();

      // Actualiza el estado con el perfil del usuario
      this.setState({ usuario: perfilUsuario });
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
    }
  }

  handleLogout = () => {
    // Elimina el token del localStorage
    localStorage.removeItem('token');

    // Redirige a la página de inicio
    window.location.href = '/';
  };

  render() {
    const { usuario } = this.state;

    // Verifica si el usuario tiene el rol necesario (en este caso, rol 1)
    const tieneAcceso = usuario.idRole === 2;

    return (
      <div>

        {/* Verifica si el usuario tiene acceso al contenido */}
        {tieneAcceso ? (
          // Contenido de la página para el usuario con rol 1
          <>
            <SidebarProfesor/>
            {/* <h1>Centro</h1>
            <NavLink to="/login" onClick={this.handleLogout} className="nav-link">
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

export default Centro;
