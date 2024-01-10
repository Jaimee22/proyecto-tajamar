import React, { useEffect, useState } from 'react';
import ApiService from '../api/ApiService'; // Asegúrate de ajustar la ruta al servicio

const Pagina2 = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosData = await ApiService.getUsuarios();
        setUsuarios(usuariosData);
      } catch (error) {
        setError(error.message || 'Error al obtener usuarios');
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Página 2</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.idUsuario}>
            <strong>Nombre:</strong> {usuario.nombre}, <strong>Email:</strong> {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagina2;
