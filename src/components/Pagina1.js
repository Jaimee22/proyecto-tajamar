import React, { useState, useEffect } from 'react';
import ApiService from '../api/ApiService';

const Pagina1 = () => {
  const [roles, setRoles] = useState([]);
  const [provincias, setProvincias] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Cargar roles
    ApiService.getRoles(token).then(rolesData => setRoles(rolesData))

    // Cargar provincias
    ApiService.getProvincias().then(provinciasData => setProvincias(provinciasData))
    
  }, []);

  return (
    <div>
      <h1>Dropdown Component</h1>

      {/* Dropdown de Roles */}
      <div>
        <label htmlFor="roles">Selecciona un rol:</label>
        <select id="roles">
          <option value="" disabled>Selecciona un rol</option>
          {roles.map(role => (
            <option key={role.idRole} value={role.idRole}>
              {role.tipoRole}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown de Provincias */}
      <div>
        <label htmlFor="provincias">Selecciona una provincia:</label>
        <select id="provincias">
          <option value="" disabled>Selecciona una provincia</option>
          {provincias.map(provincia => (
            <option key={provincia.idProvincia} value={provincia.idProvincia}>
              {provincia.nombreProvincia}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagina1;
