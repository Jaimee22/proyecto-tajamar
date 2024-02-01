import React, { Component } from 'react';
import { FaCog } from 'react-icons/fa';
import ApiService from '../../../api/ApiService';
import Sidebar from '../../../components/Sidebar/Sidebar';
import './TechRider.css';
import AccessDenied from '../../../components/AccesDenied/AccessDenied';
import Loader from '../../../components/Loader/Loader';
import videoPerfil from '../../../assets/videos/videoPerfil.mp4'; // Importa el video

class TechRider extends Component {
  state = {
    usuario: {},
    loading: true
  };

  async componentDidMount() {
    try {
      const perfilUsuario = await ApiService.getPerfilUsuario();
      this.setState({ usuario: perfilUsuario, loading: false });
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
          <div className="d-flex">
            <Sidebar />
            <div className="info-bienvenida">
              {/* Video de fondo */}
              <video
                className="video-fondo"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={videoPerfil} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
              <div id="background-difused">
                <h1 className="bienvenida">
                  <FaCog /> ¡Bienvenido <br/>TechRider {usuario.nombre}! <FaCog />
                </h1>
                <p className="descripcion-bienvenida">
                  Aquí puedes gestionar tu perfil, charlas y más.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <AccessDenied />
        )}
      </>
    );
  }
}

export default TechRider;
