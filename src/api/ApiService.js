import axios from 'axios';
import Global from '../api/Global';
import { toast } from 'react-hot-toast';

const apiUrl = Global.URL_Api;

const ApiService = {
    
  login: async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, { email, password });

      if (response.status === 200) {
        const token = response.data.response;
        console.log('Token recibido en la respuesta:', token);
        localStorage.setItem('token', token);

        toast.success('Inicio de sesión exitoso.');

        setTimeout(() => {
          window.location.reload();
          window.location.href = '/';
        }, 1000);
      } else {
        // Lógica para manejar el caso de fallo
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de inicio de sesión:', error);
      toast.error('Error al iniciar sesión. Email o contraseña incorrectos.');
    }
  },

//   getRoles: async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${apiUrl}/api/roles`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log('Datos del response (Roles):', response.data);

//       if (response.status === 200) {
//         return response.data;
//       } else {
//         console.error('Error al obtener roles:', response.status);
//         throw new Error('Error al obtener roles');
//       }
//     } catch (error) {
//       console.error('Error al obtener roles:', error);
//       throw error;
//     }
//   },

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
  }
  
};

export default ApiService;
