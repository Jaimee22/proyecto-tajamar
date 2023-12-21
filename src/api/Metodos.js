import axios from 'axios';
import Global from '../api/Global';
import { toast } from 'react-hot-toast';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${Global.URL_Api}/api/auth/login`, {
            email,
            password,
        });

        if (response.status === 200) {
            const token = response.data.response;
            console.log('Token:', token);
            localStorage.setItem('token', token);

            toast.success('Inicio de sesión exitoso.');

            setTimeout(() => {
                window.location.reload();
                window.location.href = '/';
            }, 1000);
        } else {
            // Alerta o cualquier otra lógica para manejar el caso de fallo
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        toast.error('Error al iniciar sesión. Email o contraseña incorrectos.');
    }
};

// Metodos.js
export const getRoles = async (token) => {
  try {
    const response = await axios.get(`${Global.URL_Api}/api/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Datos del response:', response.data); // Agrega esta línea para imprimir los datos del response

    if (response.status === 200) {
      return response.data;
    } else {
      // Manejar el caso de error
      console.error('Error al obtener roles:', response.status);
      throw new Error('Error al obtener roles');
    }
  } catch (error) {
    console.error('Error al obtener roles:', error);
    throw error;
  }
};

export const getProvincias = async (token) => {
  try{
    const response = await axios.get(`${Global.URL_Api}/api/provincias`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    
    if (response.status === 200) {
      return response.data;
    } else {
      // Manejar el caso de error
      console.error('Error al obtener roles:', response.status);
      throw new Error('Error al obtener roles');
    }

  }catch(error){
    console.error('Error al obtener roles:', error);
    throw error;
  }
};

