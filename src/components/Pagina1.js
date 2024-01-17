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

// function useGetCentros() {
//   return useQuery({
//     queryKey: ['centros'],
//     queryFn: async () => {
//       try {
//         const centros = await ApiService.getCentros();
//         return centros;
//       } catch (error) {
//         console.error('Error fetching centros:', error);
//         throw new Error('Error fetching centros');
//       }
//     },
//     refetchOnWindowFocus: false,
//   });
// }

// const GestionCentrosTable = () => {
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

//   const { data: centros = [], isError: isLoadingCentrosError, isFetching: isFetchingCentros, isLoading: isLoadingCentros, refetch: refetchCentros } = useGetCentros();

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

//       await ApiService.putCentros(editingCentro.idEmpresaCentro, newCentroData);
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
//       await refetchCentros();
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
//         refetchCentros();
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
//       await ApiService.postCentros(newCentroData);
//       console.log('Nuevo Centro creado:', newCentroData);
//       setCreatingCentro(false);
//       refetchCentros();
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
//         data={centros}
//         state={{
//           isLoading: isLoadingCentros,
//           showAlertBanner: isLoadingCentrosError,
//           showProgressBars: isFetchingCentros,
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
//       <GestionCentrosTable />
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
//       await ApiService.putCentros(centroDataActualizado);
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

































import React, { useEffect, useState, useCallback } from 'react';
import Service from '../api/ApiService';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

const GestionCentrosTable = () => {
  const [centros, setCentros] = useState([]);
  const [selectedCentro, setSelectedCentro] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    personaContacto: '',
    cif: '',
    idProvincia: 0,
    razonSocial: '',
    idTipoEmpresa: 2,
  });
  const [openModal, setOpenModal] = useState(false);
  const [reloadCounter, setReloadCounter] = useState(0); // Estado para forzar la recarga

  useEffect(() => {
    const fetchCentrosData = async () => {
      try {
        const centrosData = await Service.getCentros();
        setCentros(centrosData);
      } catch (error) {
        console.error('Error al obtener la lista de centros:', error);
      }
    };

    fetchCentrosData();
  }, [reloadCounter]); // Agrega reloadCounter como dependencia para forzar la recarga

  const handleShowDetails = (centro) => {
    setSelectedCentro(centro.idEmpresaCentro);
    setFormData({ ...centro });
  };

  const handleUpdateCentro = async () => {
    try {
      await Service.putCentros(formData);
      console.log('Centro actualizado exitosamente');
      setOpenModal(false);
      setReloadCounter((prevCounter) => prevCounter + 1); // Incrementa el contador para recargar
    } catch (error) {
      console.error('Error al actualizar el centro:', error);
    }
  };

  const handleOpenModal = (centro) => {
    setSelectedCentro(centro.idEmpresaCentro);
    setFormData({ ...centro });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateCentro = async () => {
    try {
      await Service.postCentros(formData);
      console.log('Centro creado exitosamente');
      setOpenModal(false);
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
        setOpenModal(false);
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
      <IconButton onClick={() => handleOpenModal(centro)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );

  const renderDeleteButton = (centro) => (
    <Tooltip title="Eliminar">
      <IconButton onClick={() => handleDeleteCentro(centro)}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );

  const renderCreateButton = () => (
    <Tooltip title="Crear Centro">
      <IconButton onClick={() => setOpenModal(true)}>
        <AddIcon />
      </IconButton>
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
      accessorKey: 'estado',
      header: 'Estado',
    },
    {
      accessorKey: 'idTipoCentro',
      header: 'Id Tipo Centro',
    },
    {
      accessorKey: 'actions',
      header: 'Acciones',
      Cell: ({ row }) => (
        <>
          {renderEditButton(row.original)}
          {/* {renderDeleteButton(row.original.idEmpresaCentro)} */}
        </>
      ),
    },
    {
        accessorKey: 'eliminar',
        header: 'Acciones',
        Cell: ({ row }) => (
          <>
            {/* {renderEditButton(row.original)} */}
            {renderDeleteButton(row.original.idEmpresaCentro)}
          </>
        ),
      },
  ];

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={centros}
        state={{
          showAlertBanner: false, // Puedes manejar esto según tus necesidades
        }}
        localization={MRT_Localization_ES}
        renderTopToolbarCustomActions={({ table }) => renderCreateButton()}
      />

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{selectedCentro ? 'Editar Centro' : 'Crear Centro'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            style={{ marginBottom: 16 }}
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
          <TextField
            label="Dirección"
            variant="outlined"
            fullWidth
            style={{ marginBottom: 16 }}
            value={formData.direccion}
            onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
          />
          <TextField
            label="Teléfono"
            variant="outlined"
            fullWidth
            style={{ marginBottom: 16 }}
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
          />
          <TextField
            label="Persona de Contacto"
            variant="outlined"
            fullWidth
            style={{ marginBottom: 16 }}
            value={formData.personaContacto}
            onChange={(e) => setFormData({ ...formData, personaContacto: e.target.value })}
          />
          <TextField
            label="CIF"
            variant="outlined"
            fullWidth
            style={{ marginBottom: 16 }}
            value={formData.cif}
            onChange={(e) => setFormData({ ...formData, cif: e.target.value })}
          />
          <TextField
            label="ID Provincia"
            variant="outlined"
            fullWidth
            style={{ marginBottom: 16 }}
            value={formData.idProvincia}
            onChange={(e) => setFormData({ ...formData, idProvincia: parseInt(e.target.value) })}
          />
          <TextField
            label="Razón Social"
            variant="outlined"
            fullWidth
            style={{ marginBottom: 16 }}
            value={formData.razonSocial}
            onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
          />
          <TextField
            label="ID Tipo Empresa"
            variant="outlined"
            fullWidth
            style={{ marginBottom: 16 }}
            value={formData.idTipoEmpresa}
            onChange={(e) => setFormData({ ...formData, idTipoEmpresa: parseInt(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={selectedCentro ? handleUpdateCentro : handleCreateCentro} color="primary">
            {selectedCentro ? 'Guardar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GestionCentrosTable;
