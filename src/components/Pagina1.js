import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getProvincias, getRoles } from '../api/Metodos'; // Ajusta la ruta correcta

export default class Pagina1 extends Component {
  state = {
    roles: [],
  };

  // Pagina1.js
async componentDidMount() {
  try {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Agrega esta línea para imprimir el token
    const roles = await getProvincias(token);
    this.setState({ roles });
  } catch (error) {
    console.error('Error al obtener roles:', error);
  }
}


  render() {
    const { roles } = this.state;

    return (
      <div>
        <h1>Pagina1</h1>
        <NavLink to="/">Hola</NavLink>

        {/* Desplegable de roles */}
        <div>
          <label htmlFor="roles">Selecciona un rol:</label>
          <select id="roles">
            <option value="" disabled>Selecciona un rol</option>
            {roles.map(role => (
              <option key={role.idProvincia} value={role.idProvincia}>
                {role.nombreProvincia}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}
