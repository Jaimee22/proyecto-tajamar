// Metodos.js
import axios from 'axios';
import Global from '../api/Global';

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
      window.location.reload();
      window.location.href = '/';
      // alert('Inicio de sesión exitoso. Token almacenado.');
    } else {
    //   alert('Usuario o contraseña incorrectos');
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
};
