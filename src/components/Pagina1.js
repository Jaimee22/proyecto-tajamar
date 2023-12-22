import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ApiService from '../api/ApiService';

const Pagina1 = () => {
  const [provincias, setProvincias] = useState([]);
  const [empresasCentros, setEmpresasCentros] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    linkedIn: '',
    password: '',
    idRole: 0,
    idProvincia: 0,
    idEmpresaCentro: 0,
    estado: 1,
  });
  const [userId, setUserId] = useState('');
  const [userById, setUserById] = useState(null);
  const [perfilUsuario, setPerfilUsuario] = useState(null);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    ApiService.getProvincias().then(provinciasData => setProvincias(provinciasData));
    ApiService.getEmpresasCentro().then(empresasCentrosData => setEmpresasCentros(empresasCentrosData));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInsertClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await ApiService.insertUser(formData, token);
      console.log('Datos del response (Inserción de Usuario):', response);
      // Puedes manejar el éxito aquí, por ejemplo, mostrando un mensaje al usuario.
    } catch (error) {
      console.error('Error al insertar usuario:', error);
      // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje de error al usuario.
    }
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSearchUser = async () => {
    try {
      const user = await ApiService.getUserById(userId);
      setUserById(user);
    } catch (error) {
      console.error('Error al buscar usuario por ID:', error);
      // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje de error al usuario.
    }
  };

  const handleGetPerfilUsuario = async () => {
    try {
      const perfil = await ApiService.getPerfilUsuario();
      setPerfilUsuario(perfil);

      // Redirigir según el idRole del usuario
      switch (perfil.idRole) {
        case 1:
          setRedirect('/pagina-admin');
          break;
        case 2:
          setRedirect('/pagina-profesor-responsable');
          break;
        case 3:
          setRedirect('/pagina-techriders');
          break;
        default:
          // Manejar otros roles o situaciones según sea necesario
          break;
      }
    } catch (error) {
      console.error('Error al obtener perfil del usuario:', error);
      // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje de error al usuario.
    }
  };

  return (
    <div>
      <h1>Formulario de Registro de Usuario</h1>

      {/* Formulario de Inserción de Usuario */}
      <form>
        {/* ... (campos existentes) */}
        <button type="button" onClick={handleInsertClick}>Insertar Usuario</button>
      </form>

      {/* Formulario de Búsqueda de Usuario por ID */}
      <div>
        <h2>Buscar Usuario por ID</h2>
        <label htmlFor="userId">ID del Usuario:</label>
        <input type="text" id="userId" name="userId" value={userId} onChange={handleUserIdChange} />
        <button type="button" onClick={handleSearchUser}>Buscar</button>
        {userById && (
          <div>
            <h3>Datos del Usuario encontrado:</h3>
            <p>ID: {userById.idUsuario}</p>
            <p>Nombre: {userById.nombre}</p>
            <p>Apellidos: {userById.apellidos}</p>
            <p>Email: {userById.email}</p>
            <p>Role: {userById.idRole}</p>
            {/* Agrega más campos según sea necesario */}
          </div>
        )}
      </div>

      {/* Botón para obtener y mostrar el perfil del usuario */}
      <div>
        <h2>Obtener Perfil de Usuario</h2>
        <button type="button" onClick={handleGetPerfilUsuario}>Obtener Perfil de Usuario</button>
        {perfilUsuario && (
          <div>
            <h3>Datos del Perfil de Usuario:</h3>
            <p>ID: {perfilUsuario.idUsuario}</p>
            <p>Nombre: {perfilUsuario.nombre}</p>
            <p>Apellidos: {perfilUsuario.apellidos}</p>
            <p>Email: {perfilUsuario.email}</p>
            <p>Role: {perfilUsuario.idRole}</p>
            {/* Agrega más campos según sea necesario */}
          </div>
        )}
      </div>

      {/* Navegación según la redirección */}
      {redirect && <Navigate to={redirect} />}
    </div>
  );
};

export default Pagina1;
