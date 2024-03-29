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


  getProvinciaPorId: async (idProvincia) => {
    try {
      const response = await axios.get(`${apiUrl}/api/provincias/${idProvincia}`);
      console.log(`Datos del response (Provincia ${idProvincia}):`, response.data);

      if (response.status === 200) {
        const provinciaData = response.data;
        return {
          idProvincia: provinciaData.idProvincia,
          nombreProvincia: provinciaData.nombreProvincia,
        };
      } else {
        console.error(`Error al obtener la provincia ${idProvincia}:`, response.status);
        throw new Error(`Error al obtener la provincia ${idProvincia}`);
      }
    } catch (error) {
      console.error(`Error al obtener la provincia ${idProvincia}:`, error);
      throw error;
    }
  },


  //_________________________________________________________________________________ 


  //--------------------------------------------------------------------------------- 
  // EMPRESAS - CENTRO --TECHRIDERS
  //---------------------------------------------------------------------------------
  //--------------------------METODO COGER TECHRIDERS ACTIVOS----------------------------------------
  getTechRidersActivos: async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/querytools/todostechridersactivos`);
      console.log('Datos del response (TechRiders):', response.data);

      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error al obtener TechRiders:', response.status);
        throw new Error('Error al obtener ?');
      }
    } catch (error) {
      console.error('Error al obtener TechRiders:', error);
      throw error;
    }
  },
  // Método para obtener todos los centros y empresas
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

  // Método para obtener solo los centros/escuelas (idTipoEmpresa = 2)
  getCentros: async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/empresascentros`);
      console.log('Datos del response (Centros):', response.data);

      if (response.status === 200) {
        const centros = response.data.filter(item => item.idTipoEmpresa === 2);
        return centros;
      } else {
        console.error('Error al obtener centros:', response.status);
        throw new Error('Error al obtener centros');
      }
    } catch (error) {
      console.error('Error al obtener Centros:', error);
      throw error;
    }
  },

  // Método para obtener solo las empresas (idTipoEmpresa = 1)
  getEmpresas: async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/empresascentros`);
      console.log('Datos del response (Empresas):', response.data);

      if (response.status === 200) {
        const empresas = response.data.filter(item => item.idTipoEmpresa === 1);
        return empresas;
      } else {
        console.error('Error al obtener empresas:', response.status);
        throw new Error('Error al obtener empresas');
      }
    } catch (error) {
      console.error('Error al obtener Empresas:', error);
      throw error;
    }
  },

  // Método para insertar Empresas
  postEmpresas: async (empresaData) => {
    try {
      // Ajusta el valor del id y idTipoEmpresa antes de realizar la solicitud
      const newEmpresaData = {
        ...empresaData,
        idEmpresaCentro: 0,
        idTipoEmpresa: 1, // idTipoCentro = 1
      };

      const token = localStorage.getItem('token');

      const response = await axios.post(`${apiUrl}/api/empresascentros`, newEmpresaData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        console.log('Empresa creada exitosamente:', response.data);
        return response.data;
      } else {
        console.error('Error al crear empresa:', response.status);
        throw new Error('Error al crear empresa');
      }
    } catch (error) {
      console.error('Error al crear empresa:', error);
      throw error;
    }
  },

  // Método para insertar Centros
  postCentros: async (centroData) => {
    try {
      // Ajusta el valor del id y idTipoCentro antes de realizar la solicitud
      const newCentroData = {
        ...centroData,
        idEmpresaCentro: 0,
        idTipoEmpresa: 2, // idTipoCentro = 2
      };

      const token = localStorage.getItem('token');

      const response = await axios.post(`${apiUrl}/api/empresascentros`, newCentroData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        console.log('Centro creado exitosamente:', response.data);
        return response.data;
      } else {
        console.error('Error al crear centro:', response.status);
        throw new Error('Error al crear centro');
      }
    } catch (error) {
      console.error('Error al crear centro:', error);
      throw error;
    }
  },

  // Método para eliminar Centros
  deleteCentro: async (centroId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.delete(`${apiUrl}/api/empresascentros/${centroId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        console.log('Centro eliminado exitosamente:', response.data);
        return response.data;
      } else {
        console.error('Error al eliminar centro:', response.status);
        throw new Error('Error al eliminar centro');
      }
    } catch (error) {
      console.error('Error al eliminar centro:', error);
      throw error;
    }
  },


  // Método para actualizar Centros
  putCentros: async (centroData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${apiUrl}/api/EmpresasCentros`, centroData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        console.log('Centro actualizado exitosamente:', response.data);
        return response.data;
      } else {
        console.error('Error al actualizar centro:', response.status);
        throw new Error('Error al actualizar centro');
      }
    } catch (error) {
      console.error('Error al actualizar centro:', error);
      throw error;
    }
  },








  //_________________________________________________________________________________ 


  //---------------------------------------------------------------------------------  
  // USUARIO
  //---------------------------------------------------------------------------------
  getUsuarios: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/api/Usuarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Datos del response (Usuarios):', response.data);

      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error al obtener usuarios:', response.status);
        throw new Error('Error al obtener usuarios');
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
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

  updateUser: async (updatedUserData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${apiUrl}/api/usuarios`, updatedUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Datos del response (Actualizar Usuario):', response.data);

      if (response.status === 200) {
        console.log('Usuario actualizado correctamente');
        return response.data;
      } else {
        console.error('Error al actualizar usuario:', response.status);
        throw new Error('Error al actualizar usuario');
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  },

  //_________________________________________________________________________________ 


  //------------------------------------------------------------------------------
  // TECNOLOGIAS
  //------------------------------------------------------------------------------
  // GET todas las tecnologias
  getTecnologias: async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/Tecnologias`);
      console.log('Datos del response (Tecnologias):', response.data);

      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error al obtener tecnologías:', response.status);
        throw new Error('Error al obtener tecnologías');
      }
    } catch (error) {
      console.error('Error al obtener tecnologías:', error);
      throw error;
    }
  },


  // Obtener nombres de tecnologías segun el ID de la tecnologia
  getTecnologiaName: async (tecnologiaId) => {
    try {
      const tecnologias = await ApiService.getTecnologias();
      const tecnologia = tecnologias.find(tecnologia => tecnologia.idTecnologia === tecnologiaId);

      if (tecnologia) {
        return tecnologia;
      } else {
        console.error(`Error al obtener tecnología con ID ${tecnologiaId}`);
        throw new Error(`Error al obtener tecnología con ID ${tecnologiaId}`);
      }
    } catch (error) {
      console.error('Error al obtener tecnología por ID:', error);
      throw error;
    }
  },

  //_________________________________________________________________________________ 


  //------------------------------------------------------------------------------
  // CHARLAS
  //------------------------------------------------------------------------------

  // OBTENER TODAS LAS CHARLAS SIN VALORACIONES
  getCharlas: async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/Charlas`);
      console.log('Datos del response (Charlas):', response.data);

      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error al obtener charlas:', response.status);
        throw new Error('Error al obtener charlas');
      }
    } catch (error) {
      console.error('Error al obtener charlas:', error);
      throw error;
    }
  },

  

  // OBTENER TODAS LAS VALORACIONES
  getValoracionesCharlas: async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/ValoracionesCharlas`);
      console.log('Datos del response (ValoracionesCharlas):', response.data);

      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error al obtener valoraciones de charlas:', response.status);
        throw new Error('Error al obtener valoraciones de charlas');
      }
    } catch (error) {
      console.error('Error al obtener valoraciones de charlas:', error);
      throw error;
    }
  },

  // OBTENER LOS ESTADOS DE LAS CHARLAS
  getEstadosCharlas: async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/EstadosCharlas`);
      console.log('Datos del response (EstadosCharlas):', response.data);

      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error al obtener estados de charlas:', response.status);
        throw new Error('Error al obtener estados de charlas');
      }
    } catch (error) {
      console.error('Error al obtener estados de charlas:', error);
      throw error;
    }
  },

  // OBTENER LAS CHARLAS CON EL ESTADO
  // getCharlasConEstados: async () => {
  //   try {
  //     const charlas = await ApiService.getCharlas();
  //     const estadosCharlas = await ApiService.getEstadosCharlas();

  //     // Enlazar las charlas con sus estados correspondientes
  //     const charlasConEstados = charlas.map(charla => {
  //       const estado = estadosCharlas.find(estado => estado.idEstadosCharla === charla.idEstadoCharla);
  //       return {
  //         ...charla,
  //         estado: estado || null,
  //       };
  //     });

  //     return charlasConEstados;
  //   } catch (error) {
  //     console.error('Error al obtener charlas con estados:', error);
  //     throw error;
  //   }
  // },

  // OBTENER CHARLAS COMPLETAS
  getCharlasCompletas: async () => {
    try {
      const charlas = await ApiService.getCharlas();
      const estadosCharlas = await ApiService.getEstadosCharlas();
      const valoracionesCharlas = await ApiService.getValoracionesCharlas();
      const tecnologiasCharlas = await ApiService.getTecnologiasCharla();

      // Enlazar las charlas con sus estados, valoraciones y tecnologías correspondientes
      const charlasCompletas = charlas.map(charla => {
        const estado = estadosCharlas.find(estado => estado.idEstadosCharla === charla.idEstadoCharla);
        const valoracion = valoracionesCharlas.find(valoracion => valoracion.idCharla === charla.idCharla);
        const tecnologias = tecnologiasCharlas
          .filter(tecnologia => tecnologia.idCharla === charla.idCharla)
          .map(tecnologia => {
            const tecnologiaInfo = ApiService.getTecnologiaName(tecnologia.idTecnologia);
            return tecnologiaInfo.nombreTecnologia;
          });

        return {
          charla,
          estado: estado || null,
          valoracion: valoracion || null,
          tecnologias,
        };
      });

      return charlasCompletas;
    } catch (error) {
      console.error('Error al obtener charlas completas:', error);
      throw error;
    }
  },



  // OBTENER LAS CHARLAS CON VALORACIONES 
  // getCharlasConValoraciones: async () => {
  //   try {
  //     const charlas = await ApiService.getCharlas();
  //     const valoracionesCharlas = await ApiService.getValoracionesCharlas();

  //     // Enlazar las charlas con sus valoraciones correspondientes
  //     const charlasConValoraciones = charlas.map(charla => {
  //       const valoracion = valoracionesCharlas.find(valoracion => valoracion.idCharla === charla.idCharla);
  //       return {
  //         ...charla,
  //         valoracion: valoracion || null,
  //       };
  //     });

  //     return charlasConValoraciones;
  //   } catch (error) {
  //     console.error('Error al obtener charlas con valoraciones:', error);
  //     throw error;
  //   }
  // },

  // OBTENER TECNOLOGIAS DE LAS CHARLAS
  getTecnologiasCharla: async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/TecnologiasCharlas`);
      console.log('Datos del response (TecnologiasCharlas):', response.data);

      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error al obtener tecnologías de charlas:', response.status);
        throw new Error('Error al obtener tecnologías de charlas');
      }
    } catch (error) {
      console.error('Error al obtener tecnologías de charlas:', error);
      throw error;
    }
  },



  getCharlasPorEstado: async (estadoId) => {
    try {
      const estadosCharlas = await ApiService.getEstadosCharlas();
      const charlas = await ApiService.getCharlas();

      const estadoSeleccionado = estadosCharlas.find((estado) => estado.idEstadosCharla === parseInt(estadoId));

      if (!estadoSeleccionado) {
        throw new Error('Estado no encontrado');
      }

      const charlasFiltradas = charlas.filter((charla) => charla.idEstadoCharla === estadoSeleccionado.idEstadosCharla);

      return {
        estado: estadoSeleccionado,
        charlas: charlasFiltradas,
      };
    } catch (error) {
      console.error('Error al obtener charlas por estado:', error);
      throw error;
    }
  },


  //------------------------------------------------------------------------------
  // QUERY TOOLS
  //------------------------------------------------------------------------------

  getCharlasByTechrider: async (idUsuario) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/api/QueryTools/CharlasTechRider/${idUsuario}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Datos del response (Charlas TechRider):', response.data);
  
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error al obtener las charlas por TechRider:', response.status);
        throw new Error('Error al obtener las charlas por TechRider');
      }
    } catch (error) {
      console.error('Error al obtener las charlas por TechRider:', error);
      throw error;
    }
  }

  //_________________________________________________________________________________ 

  



};
export default ApiService;
