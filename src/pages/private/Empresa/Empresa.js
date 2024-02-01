import React, { Component } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import ApiService from '../../../api/ApiService'; // Ajusta la ruta según la estructura de tu proyecto
import './Empresa.css'
import AccessDenied from '../../../components/AccesDenied/AccessDenied';
import Loader from '../../../components/Loader/Loader';
import SidebarProfesor from '../../../components/SidebarProfesor/SidebarProfesor'

class Empresa extends Component {
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
      this.setState({ usuario: perfilUsuario});
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      this.setState({loading: false});
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

    if(loading){
      return <Loader/>;
    }

    // Verifica si el usuario tiene el rol necesario (en este caso, rol 1)
    const tieneAcceso = usuario.idRole === 2;


    return (
      <div>

        {/* Verifica si el usuario tiene acceso al contenido */}
        {tieneAcceso ? (
          // Contenido de la página para el usuario con rol 1
          <>
            <SidebarProfesor />
            {/* <h1>Empresa</h1>
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

export default Empresa;
