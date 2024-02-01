import React, { Component } from "react";
import { FaCog } from 'react-icons/fa';
import ApiService from "../../../api/ApiService";
import "./Empresa.css";
import AccessDenied from "../../../components/AccesDenied/AccessDenied";
import Loader from "../../../components/Loader/Loader";
import SidebarProfesor from "../../../components/SidebarProfesor/SidebarProfesor";

class Empresa extends Component {
  state = {
    usuario: {},
    loading: true,
  };

  async componentDidMount() {
    try {
      const perfilUsuario = await ApiService.getPerfilUsuario();
      this.setState({ usuario: perfilUsuario, loading: false });
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      this.setState({ loading: false });
    }
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  async componentDidMount() {
    try {
      // Obtén el perfil del usuario utilizando el método del servicio
      const perfilUsuario = await ApiService.getPerfilUsuario();
      this.setState({ usuario: perfilUsuario, loading: false });
      // Actualiza el estado con el perfil del usuario
      this.setState({ usuario: perfilUsuario });
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      this.setState({ loading: false });
    }
  }

  handleLogout = () => {
    // Elimina el token del localStorage
    localStorage.removeItem("token");

    // Redirige a la página de inicio
    window.location.href = "/";
  };

  render() {
    const { usuario, loading } = this.state;

    if (loading) {
      return <Loader />;
    }

    // Verifica si el usuario tiene el rol necesario (en este caso, rol 1)
    const tieneAcceso = usuario.idRole === 2;

    return (
      <>
        {tieneAcceso ? (
          <div className="d-flex">
            <SidebarProfesor />
            <div className="info-bienvenida">
              <h1 className="bienvenida">
                <FaCog /> ¡Bienvenido <br />
                profesor {usuario.nombre}! <FaCog />
              </h1>
              <p className="descripcion-bienvenida">
                Aquí puedes gestionar tu perfil, charlas y más.
              </p>
            </div>
          </div>
        ) : (
          <AccessDenied />
        )}
      </>
    );
  }
}

export default Empresa;
