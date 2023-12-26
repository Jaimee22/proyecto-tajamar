import axios from 'axios';
import Global from '../api/Global';
import { toast } from 'react-hot-toast';

const apiUrl = Global.URL_Api;

const ApiService = {
    
  
  //--------------------------------------------------------------------------------- 
  // LOGIN
  //---------------------------------------------------------------------------------
  login: async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, { email, password });

      if (response.status === 200) {
        const token = response.data.response;
        console.log('Token recibido en la respuesta:', token);
        localStorage.setItem('token', token);

        toast.success('Inicio de sesión exitoso.');

        // setTimeout(() => {
        //   window.location.reload();
        //   window.location.href = '/';
        // }, 1000);
      } else {
        
        
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de inicio de sesión:', error);
      toast.error('Error al iniciar sesión. Email o contraseña incorrectos.');
    }
  },
  //_________________________________________________________________________________ 

  
  //--------------------------------------------------------------------------------- 
  // ROLES
  //---------------------------------------------------------------------------------
  getRoles: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/api/roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Datos del response (Roles):', response.data);
      
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error al obtener roles:', response.status);
        throw new Error('Error al obtener roles');
      }
    } catch (error) {
      console.error('Error al obtener roles:', error);
      throw error;
    }
  },
  //_________________________________________________________________________________ 

  
  //--------------------------------------------------------------------------------- 
  // PROVINCIAS
  //---------------------------------------------------------------------------------
  getProvincias: async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/provincias`);
      console.log('Datos del response (Provincias):', response.data);

      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error al obtener provincias:', response.status);
        throw new Error('Error al obtener provincias');
      }
    } catch (error) {
      console.error('Error al obtener provincias:', error);
      throw error;
    }
  },
  //_________________________________________________________________________________ 


  //--------------------------------------------------------------------------------- 
  // EMPRESAS - CENTRO
  //---------------------------------------------------------------------------------
  getEmpresasCentro: async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/empresascentros`);
        console.log('Datos del response (EmpresasCentros):', response.data);
  
        if (response.status === 200) {
          return response.data;
        } else {
          console.error('Error al obtener empreasas centros:', response.status);
          throw new Error('Error al obtener provincias');
        }
      } catch (error) {
        console.error('Error al obtener EmpresasCentros:', error);
        throw error;
      }
  },
  //_________________________________________________________________________________ 
  
  
  //---------------------------------------------------------------------------------  
  // USUARIO
  //---------------------------------------------------------------------------------
  insertUser: async (usuario) => {
    try {
      const response = await axios.post(`${apiUrl}/api/usuarios`, usuario);
      console.log('Datos del response (Usuarios):', response.data);
  
      if (response.status === 200) {
        console.log("Insert hecho correctamente");
        return response.data;
      } else {
        console.error('Error al ejecutar método insert:', response.status);
        throw new Error('Error');
      }
    } catch (error) {
      console.error('Error al obtener Usuarios:', error);
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/api/usuarios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Datos del response (Usuario por ID):', response.data);

      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error al obtener usuario por ID:', response.status);
        throw new Error('Error al obtener usuario por ID');
      }
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      throw error;
    }
  },

  getPerfilUsuario: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/api/usuarios/perfilusuario`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Datos del response (Perfil de Usuario):', response.data);

      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error al obtener el perfil del usuario:', response.status);
        throw new Error('Error al obtener el perfil del usuario');
      }
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      throw error;
    }
  },
  //_________________________________________________________________________________ 


  //------------------------------------------------------------------------------
  // CHARLAS
  //------------------------------------------------------------------------------
  
  
};
export default ApiService;
