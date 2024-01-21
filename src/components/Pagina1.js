// En Pagina1.js

// import React, { useEffect, useState } from 'react';
// import ApiService from '../api/ApiService';
// import BotonVolver from './BotonVolver/BotonVolver';

// const Pagina1 = () => {
//   const [estadosCharlas, setEstadosCharlas] = useState([]);
//   const [charlas, setCharlas] = useState([]);
//   const [selectedEstado, setSelectedEstado] = useState('');
//   const [noHayDatos, setNoHayDatos] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const estados = await ApiService.getEstadosCharlas();
//         setEstadosCharlas(estados);
//       } catch (error) {
//         console.error('Error al obtener estados de charlas:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleObtenerCharlasPorEstado = async (estadoId) => {
//     try {
//       const { estado, charlas } = await ApiService.getCharlasPorEstado(estadoId);
//       setCharlas(charlas);
//       setNoHayDatos(charlas.length === 0);
//     } catch (error) {
//       console.error('Error al obtener charlas por estado:', error);
//     }
//   };

//   return (
//     <div>
//       <BotonVolver/>
//       <h1>Página 1</h1>
//       <label htmlFor="estadoSelect">Selecciona un estado:</label>
//       <select
//         id="estadoSelect"
//         value={selectedEstado}
//         onChange={(e) => {
//           setSelectedEstado(e.target.value);
//           handleObtenerCharlasPorEstado(e.target.value);
//         }}
//       >
//         <option value="" disabled>
//           Selecciona un estado
//         </option>
//         {estadosCharlas.map((estado) => (
//           <option key={estado.idEstadosCharla} value={estado.idEstadosCharla}>
//             {estado.tipo}
//           </option>
//         ))}
//       </select>

//       <h2>Charlas por estado:</h2>
//       {noHayDatos ? (
//         <p>No hay charlas en ese estado.</p>
//       ) : (
//         <ul>
//           {charlas.map((charla) => (
//             <li key={charla.idCharla}>{charla.idCharla} - {charla.descripcion}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Pagina1;


// import React, { useState } from "react";
// import Scheduler from "@mui/material/Scheduler";

// function Pagina1() {
//   const [events, setEvents] = useState([
//     {
//       title: "Reunión con el cliente",
//       start: new Date(2024, 01, 12, 10, 00, 00),
//       end: new Date(2024, 01, 12, 12, 00, 00),
//     },
//     {
//       title: "Entrega de proyecto",
//       start: new Date(2024, 01, 13, 14, 00, 00),
//       end: new Date(2024, 01, 13, 16, 00, 00),
//     },
//   ]);

//   return (
//     <div>
//       <Scheduler
//         events={events}
//         onEventClick={(event) => {
//           console.log(event);
//         }}
//       />
//     </div>
//   );
// }

// export default Pagina1;



































// import React, { useState } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Tooltip,
// } from '@mui/material';
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
// import { MdDelete } from 'react-icons/md';
// import EditIcon from '@mui/icons-material/Edit';
// import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
// import { MRT_Localization_ES } from 'material-react-table/locales/es';
// import ApiService from '../api/ApiService';

// function useGetEmpresas() {
//   return useQuery({
//     queryKey: ['Empresas'],
//     queryFn: async () => {
//       try {
//         const Empresas = await ApiService.getEmpresas();
//         return Empresas;
//       } catch (error) {
//         console.error('Error fetching Empresas:', error);
//         throw new Error('Error fetching Empresas');
//       }
//     },
//     refetchOnWindowFocus: false,
//   });
// }

// const GestionEmpresasTable = () => {
//   const [editingCentro, setEditingCentro] = useState(null);
//   const [creatingCentro, setCreatingCentro] = useState(false);
//   const [newCentroData, setNewCentroData] = useState({
//     nombre: '',
//     direccion: '',
//     telefono: '',
//     personaContacto: '',
//     cif: '',
//     idProvincia: 7,
//     razonSocial: '',
//     idTipoCentro: 2,
//   });
//   const [openModal, setOpenModal] = useState(false);

//   const { data: Empresas = [], isError: isLoadingEmpresasError, isFetching: isFetchingEmpresas, isLoading: isLoadingEmpresas, refetch: refetchEmpresas } = useGetEmpresas();

//   const handleEditCentro = (centro) => {
//     console.log('Editando centro:', centro);
//     setEditingCentro(centro);
//     setNewCentroData({ ...centro });
//     setOpenModal(true);
//   };

//   const handleCancelEditCentroForm = () => {
//     setEditingCentro(null);
//     setNewCentroData({
//       nombre: '',
//       direccion: '',
//       telefono: '',
//       personaContacto: '',
//       cif: '',
//       idProvincia: 7,
//       razonSocial: '',
//       idTipoCentro: 2,
//     });
//     setOpenModal(false);
//   };

//   const handleSaveEditCentroForm = async () => {
//     try {
//       console.log('Datos del centro:', newCentroData);
//       const isValidData = Object.values(newCentroData).every((value) => value !== null && value !== undefined);

//       if (!isValidData) {
//         console.error('Los datos del centro no son válidos');
//         return;
//       }

//       await ApiService.putEmpresas(editingCentro.idEmpresaCentro, newCentroData);
//       setEditingCentro(null);
//       setNewCentroData({
//         nombre: '',
//         direccion: '',
//         telefono: '',
//         personaContacto: '',
//         cif: '',
//         idProvincia: 7,
//         razonSocial: '',
//         idTipoCentro: 2,
//       });
//       setOpenModal(false);
//       await refetchEmpresas();
//     } catch (error) {
//       console.error('Error al guardar la edición del centro:', error);
//       if (error.response) {
//         console.error('Respuesta del servidor:', error.response.data);
//       }
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingCentro(null);
//     setOpenModal(false);
//   };

//   const handleDeleteCentro = async (centro) => {
//     if (window.confirm('¿Estás seguro de que quieres eliminar este centro?')) {
//       try {
//         await ApiService.deleteCentro(centro.idEmpresaCentro);
//         console.log('Centro eliminado:', centro);
//         refetchEmpresas();
//       } catch (error) {
//         console.error('Error al eliminar el centro:', error);
//       }
//     }
//   };

//   const handleCreateCentroForm = () => {
//     setCreatingCentro(true);
//   };

//   const handleSaveCreateCentroForm = async () => {
//     try {
//       await ApiService.postEmpresas(newCentroData);
//       console.log('Nuevo Centro creado:', newCentroData);
//       setCreatingCentro(false);
//       refetchEmpresas();
//     } catch (error) {
//       console.error('Error al crear el centro:', error);
//     }
//   };

//   const handleCancelCreateCentroForm = () => {
//     setCreatingCentro(false);
//   };

//   const handleInputChangeCentroForm = (e) => {
//     const { name, value } = e.target;

//     setNewCentroData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const renderEditFields = () => {
//     return Object.keys(newCentroData).map((key) => (
//       <TextField
//         key={key}
//         className="mt-2"
//         label={key}
//         name={key}
//         value={newCentroData[key]}
//         onChange={handleInputChangeCentroForm}
//         fullWidth
//       />
//     ));
//   };

//   const columns = [
//     // ... las otras columnas aquí
//     {
//       accessorKey: 'idEmpresaCentro',
//       header: 'Centro ID',
//       size: 100,
//     },
//     {
//       accessorKey: 'nombre',
//       header: 'Nombre del Centro',
//     },
//     {
//       accessorKey: 'direccion',
//       header: 'Dirección',
//     },
//     {
//       accessorKey: 'telefono',
//       header: 'Teléfono',
//     },
//     {
//       accessorKey: 'estado',
//       header: 'Estado',
//     },
//     {
//       accessorKey: 'idTipoCentro',
//       header: 'Id Tipo Centro',
//     },
//     {
//       accessorKey: 'actions',
//       header: 'Acciones',
//       Cell: ({ row }) => (
//         <div style={{ display: 'flex', gap: '1rem' }}>
//           <Tooltip title="Editar">
//             <IconButton onClick={() => handleEditCentro(row.original)}>
//               <EditIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Eliminar">
//             <IconButton
//               color="error"
//               onClick={() => handleDeleteCentro(row.original)}
//             >
//               <MdDelete size={30} />
//             </IconButton>
//           </Tooltip>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <>
//       <MaterialReactTable
//         columns={columns}
//         data={Empresas}
//         state={{
//           isLoading: isLoadingEmpresas,
//           showAlertBanner: isLoadingEmpresasError,
//           showProgressBars: isFetchingEmpresas,
//         }}
//         localization={MRT_Localization_ES}
//         renderTopToolbarCustomActions={({ table }) => (
//           <>
//             <Button variant="contained" onClick={handleCreateCentroForm}>
//               Crear Nuevo Centro
//             </Button>
//           </>
//         )}
//       />
  
//       {editingCentro && (
//         <Dialog open={openModal} onClose={handleCancelEditCentroForm}>
//           <DialogTitle className="text-center">
//             Editar Centro
//           </DialogTitle>
//           <DialogContent>
//             {renderEditFields()}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCancelEditCentroForm}>Cancelar</Button>
//             <Button onClick={handleSaveEditCentroForm}>Guardar</Button>
//           </DialogActions>
//         </Dialog>
//       )}
  
//       {creatingCentro && (
//         <Dialog open={creatingCentro} onClose={handleCancelCreateCentroForm}>
//           <DialogTitle className="text-center">
//             Crear Nuevo Centro Form
//           </DialogTitle>
//           <DialogContent>
//             {renderEditFields()}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCancelCreateCentroForm}>Cancelar</Button>
//             <Button onClick={handleSaveCreateCentroForm}>Guardar</Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </>
//   );
// };

// function App() {
//   const queryClient = new QueryClient();

//   return (
//     <QueryClientProvider client={queryClient}>
//       <GestionEmpresasTable />
//     </QueryClientProvider>
//   );
// }

// export default App;









































// import React, { useState } from 'react';
// import ApiService from '../api/ApiService';

// const Pagina1 = () => {
//   const [centroDataActualizado, setCentroDataActualizado] = useState({
//     idEmpresaCentro: 19,
//     nombre: "Centro Actualizado",
//     direccion: "Nueva Dirección",
//     telefono: "Nuevo Teléfono",
//     personaContacto: "Nueva Persona de Contacto",
//     cif: "Nuevo CIF",
//     idProvincia: 1, // Reemplaza con el nuevo ID de provincia
//     razonSocial: "Nueva Razón Social",
//     idTipoEmpresa: 2, // Reemplaza con el nuevo ID de tipo de empresa
//   });

//   const handleActualizarCentro = async () => {
//     try {
//       await ApiService.putEmpresas(centroDataActualizado);
//       console.log('Centro actualizado exitosamente.');
//     } catch (error) {
//       console.error('Error al actualizar centro:', error);
//     }
//   };  


//   return (
//     <div>
//       <h1>Página 1</h1>
//       <button onClick={handleActualizarCentro}>Actualizar Ahora</button>
//     </div>
//   );
// };

// export default Pagina1;























// import React, { useEffect, useState } from 'react';
// import Service from '../api/ApiService';
// import { MaterialReactTable } from 'material-react-table';
// import { MRT_Localization_ES } from 'material-react-table/locales/es';

// const GestionEmpresasTable = () => {
//   const [Empresas, setEmpresas] = useState([]);

//   useEffect(() => {
//     const fetchEmpresasData = async () => {
//       try {
//         const EmpresasData = await Service.getEmpresas();
//         const empresasWithProvincias = await addProvinciasToEmpresas(EmpresasData);
//         setEmpresas(empresasWithProvincias);
//       } catch (error) {
//         console.error('Error al obtener la lista de Empresas:', error);
//       }
//     };

//     fetchEmpresasData();
//   }, []);

//   const addProvinciasToEmpresas = async (empresas) => {
//     const empresasWithProvincias = await Promise.all(
//       empresas.map(async (empresa) => {
//         try {
//           const provincia = await Service.getProvinciaPorId(empresa.idProvincia);
//           return {
//             ...empresa,
//             nombreProvincia: provincia.nombreProvincia,
//           };
//         } catch (error) {
//           console.error(`Error al obtener la provincia para la empresa ${empresa.idEmpresaCentro}:`, error);
//           return empresa;
//         }
//       })
//     );
//     return empresasWithProvincias;
//   };

//   const columns = [
//     {
//       accessorKey: 'idEmpresaCentro',
//       header: 'Centro ID',
//       size: 100,
//     },
//     {
//       accessorKey: 'nombre',
//       header: 'Nombre del Centro',
//     },
//     {
//       accessorKey: 'direccion',
//       header: 'Dirección',
//     },
//     {
//       accessorKey: 'telefono',
//       header: 'Teléfono',
//     },
//     {
//       accessorKey: 'personaContacto',
//       header: 'Persona Contacto',
//     },
//     {
//       accessorKey: 'cif',
//       header: 'CIF',
//     },
//     {
//       accessorKey: 'idTipoEmpresa',
//       header: 'Id Tipo Centro',
//     },
//     {
//       accessorKey: 'nombreProvincia',
//       header: 'Provincia',
//     },
//     {
//       accessorKey: 'razonSocial',
//       header: 'Razón Social',
//     },
//   ];

//   return (
//     <>
//       <MaterialReactTable
//         columns={columns}
//         data={Empresas}
//         state={{
//           showAlertBanner: false,
//         }}
//         initialState={{
//           columnVisibility: {
//             'idEmpresaCentro': false,
//             'razonSocial': false,
//           },
//         }}
//         enableFullScreenToggle={false}
//         localization={MRT_Localization_ES}
//         paginationDisplayMode={'pages'}
//       />
//     </>
//   );
// };

// export default GestionEmpresasTable;

import React, { useEffect, useState } from 'react';
import Service from '../api/ApiService';
import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const GestionEmpresasTable = () => {
  const [Empresas, setEmpresas] = useState([]);
  const [selectedCentro, setSelectedCentro] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    personaContacto: '',
    cif: '',
    idProvincia: '',
    razonSocial: '',
    idTipoEmpresa: 1,
  });
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [reloadCounter, setReloadCounter] = useState(0); // Estado para forzar la recarga

  useEffect(() => {
    const fetchEmpresasData = async () => {
      try {
        const EmpresasData = await Service.getEmpresas();
        const empresasWithProvincias = await addProvinciasToEmpresas(EmpresasData);
        setEmpresas(empresasWithProvincias);
      } catch (error) {
        console.error('Error al obtener la lista de Empresas:', error);
      }
    };

    fetchEmpresasData();
  }, [reloadCounter]); // Agrega reloadCounter como dependencia para forzar la recarga

  const addProvinciasToEmpresas = async (empresas) => {
    const empresasWithProvincias = await Promise.all(
      empresas.map(async (empresa) => {
        try {
          const provincia = await Service.getProvinciaPorId(empresa.idProvincia);
          return {
            ...empresa,
            idProvincia: provincia.nombreProvincia,
          };
        } catch (error) {
          console.error(`Error al obtener la provincia para la empresa ${empresa.idEmpresaCentro}:`, error);
          return empresa;
        }
      })
    );
    return empresasWithProvincias;
  };

  const handleShowDetails = async (centro) => {
    setSelectedCentro(centro.idEmpresaCentro);

    try {
      const provincia = await Service.getProvinciaPorId(centro.idProvincia);
      setFormData({
        ...centro,
        idProvincia: provincia.idProvincia, // Utilizar el ID de la provincia
      });
    } catch (error) {
      console.error(`Error al obtener la provincia para la empresa ${centro.idEmpresaCentro}:`, error);
      setFormData({ ...centro }); // Mantener el valor original en caso de error
    }

    setOpenEditModal(true);
  };

  const handleUpdateCentro = async () => {
    try {
      await Service.putCentros(formData);
      console.log('Centro actualizado exitosamente');
      setOpenEditModal(false);
      setReloadCounter((prevCounter) => prevCounter + 1); // Incrementa el contador para recargar
    } catch (error) {
      console.error('Error al actualizar el centro:', error);
    }
  };

  const handleOpenCreateModal = () => {
    setFormData({
      nombre: '',
      direccion: '',
      telefono: '',
      personaContacto: '',
      cif: '',
      idProvincia: '',
      razonSocial: '',
      idTipoEmpresa: 1,
    });
    setOpenCreateModal(true);
  };

  const handleOpenEditModal = (centro) => {
    setSelectedCentro(centro.idEmpresaCentro);
    setFormData({ ...centro });
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setOpenCreateModal(false);
    setOpenEditModal(false);
  };

  const handleCreateCentro = async () => {
    try {
      await Service.postEmpresas(formData);
      console.log('Centro creado exitosamente');
      setOpenCreateModal(false);
      setReloadCounter((prevCounter) => prevCounter + 1); // Incrementa el contador para recargar
    } catch (error) {
      console.error('Error al crear el centro:', error);
    }
  };

  const handleDeleteCentro = async (centroId) => {
    console.log('Centro seleccionado para eliminar:', centroId);
    if (centroId !== null) {
      try {
        await Service.deleteCentro(centroId);
        console.log('Centro eliminado exitosamente');
        setOpenEditModal(false);
        setReloadCounter((prevCounter) => prevCounter + 1); // Incrementa el contador para recargar
      } catch (error) {
        console.error('Error al eliminar el centro:', error);
      }
    } else {
      console.error('No se ha seleccionado ningún centro para eliminar.');
    }
  };

  const renderEditButton = (centro) => (
    <Tooltip title="Editar">
      <IconButton onClick={() => handleOpenEditModal(centro)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );

  const renderDeleteButton = (centro) => (
    <Tooltip title="Eliminar">
      <IconButton onClick={() => handleDeleteCentro(centro.idEmpresaCentro)} color="error">
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );

  const renderCreateButton = () => (
    <Tooltip title="Crear Nuevo Centro">
      <Button variant="contained" onClick={handleOpenCreateModal}>
        Crear Nuevo Centro
      </Button>
    </Tooltip>
  );

  const columns = [
    {
      accessorKey: 'idEmpresaCentro',
      header: 'Centro ID',
      size: 100,
    },
    {
      accessorKey: 'nombre',
      header: 'Nombre del Centro',
    },
    {
      accessorKey: 'direccion',
      header: 'Dirección',
    },
    {
      accessorKey: 'telefono',
      header: 'Teléfono',
    },
    {
      accessorKey: 'personaContacto',
      header: 'Persona Contacto',
    },
    {
      accessorKey: 'cif',
      header: 'CIF',
    },
    {
      accessorKey: 'idTipoEmpresa',
      header: 'Id Tipo Centro',
    },
    {
      accessorKey: 'idProvincia',
      header: 'Provincia',
    },
    {
      accessorKey: 'razonSocial',
      header: 'Razón Social',
    },
    {
      accessorKey: 'actions',
      header: 'Acciones',
      Cell: ({ row }) => (
        <>
          {renderEditButton(row.original)}
          {renderDeleteButton(row.original.idEmpresaCentro)}
        </>
      ),
    },
  ];

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={Empresas}
        state={{
          showAlertBanner: false, // Puedes manejar esto según tus necesidades
        }}
        initialState={{
          columnVisibility: {
            'idEmpresaCentro': false,
            'razonSocial': false,
          },
        }}
        enableFullScreenToggle={false}
        localization={MRT_Localization_ES}
        renderTopToolbarCustomActions={({ table }) => renderCreateButton()}
        paginationDisplayMode={'pages'}
      />

      {/* Modal para Crear Centro */}
      <Dialog open={openCreateModal} onClose={handleCloseModal}>
        <DialogTitle>Crear Centro</DialogTitle>
        <DialogContent>
          {/* ... (campos del formulario) */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleCreateCentro} color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para Editar Centro */}
      <Dialog open={openEditModal} onClose={handleCloseModal}>
        <DialogTitle>Editar Centro</DialogTitle>
        <DialogContent>
          {/* ... (campos del formulario) */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleUpdateCentro} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GestionEmpresasTable;

