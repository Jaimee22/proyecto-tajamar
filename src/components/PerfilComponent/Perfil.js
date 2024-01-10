import React, { Component } from 'react';
import ApiService from '../../api/ApiService';
import './Perfil.css';

export default class Perfil extends Component {
  state = {
    usuario: {
      idUsuario: 0,
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      linkedIn: '',
      password: '',
      idRole: 0,
      idProvincia: 0,
      idEmpresaCentro: 0,
      estado: 0,
    },
    isEditMode: false,
  };

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile = async () => {
    try {
      const userProfile = await ApiService.getPerfilUsuario();
      this.setState({ usuario: userProfile });
    } catch (error) {
      console.error('Error al cargar el perfil del usuario:', error);
    }
  };

  handleEditClick = () => {
    this.setState({ isEditMode: true });
  };

  handleSaveClick = async () => {
    try {
      const { usuario } = this.state;
      await ApiService.updateUser(usuario.idUsuario, usuario);  // Llama al método updateUser

      // Recarga el perfil después de la actualización
      await this.loadUserProfile();

      // Después de guardar, volvemos al modo de visualización
      this.setState({ isEditMode: false });
    } catch (error) {
      console.error('Error al guardar el perfil del usuario:', error);
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      usuario: {
        ...prevState.usuario,
        [name]: value,
      },
    }));
  };

  render() {
    const { usuario, isEditMode } = this.state;

    return (
      <div className="perfil-container">
        <h1>Perfil</h1>
        <div>
          <label className="label">Nombre: </label>
          {isEditMode ? (
            <input
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={this.handleInputChange}
              className="input-field"
            />
          ) : (
            <span>{usuario.nombre}</span>
          )}
        </div>
        <div>
          <label className="label">Apellidos: </label>
          {isEditMode ? (
            <input
              type="text"
              name="apellidos"
              value={usuario.apellidos}
              onChange={this.handleInputChange}
              className="input-field"
            />
          ) : (
            <span>{usuario.apellidos}</span>
          )}
        </div>
        <div>
          <label className="label">Email: </label>
          {isEditMode ? (
            <input
              type="text"
              name="email"
              value={usuario.email}
              onChange={this.handleInputChange}
              className="input-field"
            />
          ) : (
            <span>{usuario.email}</span>
          )}
        </div>
        {/* Repite este patrón para otros campos del perfil */}
        {/* ... */}

        {isEditMode ? (
          <button onClick={this.handleSaveClick} className="edit-button">
            Guardar
          </button>
        ) : (
          <button onClick={this.handleEditClick} className="edit-button">
            Editar
          </button>
        )}
      </div>
    );
  }
}
