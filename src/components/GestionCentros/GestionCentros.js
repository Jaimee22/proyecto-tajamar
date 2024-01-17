// import React, { useState } from 'react';
// import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
// import { Tooltip, IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
// import { MRT_Localization_ES } from 'material-react-table/locales/es';
// import { MdDelete } from 'react-icons/md';

// // Replace 'ApiService' with the name of your service for Centros
// import ApiService from '../../api/ApiService';

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

// function GestionCentrosTable() {
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

//   const columns = [
//     {
//       accessorKey: 'idCentro',
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
//             <IconButton color="error" onClick={() => handleDeleteCentro(row.original)}>
//               <MdDelete size={30} />
//             </IconButton>
//           </Tooltip>
//         </div>
//       ),
//     },
//   ];

//   const {
//     data: centros = [],
//     isError: isLoadingCentrosError,
//     isFetching: isFetchingCentros,
//     isLoading: isLoadingCentros,
//     refetch: refetchCentros,
//   } = useGetCentros();

//   const handleEditCentro = (centro) => {
//     setEditingCentro(centro);
//   };

//   const handleSaveEdit = async () => {
//     console.log('Guardar edición:', editingCentro);
//     // Implement logic to save the edit here
//     // For example: await ApiService.updateCentro(editingCentro);
//     setEditingCentro(null);
//   };

//   const handleCancelEdit = () => {
//     setEditingCentro(null);
//   };

//   const handleDeleteCentro = (centro) => {
//     if (window.confirm('¿Estás seguro de que quieres eliminar este centro?')) {
//       console.log('Centro Eliminado:', centro);
//       // Implement logic to delete the centro here
//       // Example: await ApiService.deleteCentro(centro.idCentro);
//     }
//   };

//   const handleCreateCentroForm = () => {
//     setCreatingCentro(true);
//   };

//   const handleSaveCreateCentroForm = async () => {
//     try {
//       // Implement logic to save the new Centro
//       await ApiService.postCentros(newCentroData);
//       console.log('Nuevo Centro creado:', newCentroData);
//       setCreatingCentro(false);
//       refetchCentros();
//       // You can perform additional actions after creation, such as reloading the list of centros, etc.
//     } catch (error) {
//       console.error('Error al crear centro:', error);
//       // Handle the error as needed (show a user message, etc.)
//     }
//   };

//   const handleCancelCreateCentroForm = () => {
//     setCreatingCentro(false);
//   };

//   const handleInputChangeCentroForm = (e) => {
//     const { name, value } = e.target;
//     setNewCentroData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const table = useMaterialReactTable({
//     columns,
//     data: centros,
//     state: {
//       isLoading: isLoadingCentros,
//       showAlertBanner: isLoadingCentrosError,
//       showProgressBars: isFetchingCentros,
//     },
//     localization: MRT_Localization_ES,
//     renderTopToolbarCustomActions: ({ table }) => (
//       <>
//         <Button variant="contained" onClick={handleCreateCentroForm}>
//           Crear Nuevo Centro
//         </Button>
//       </>
//     ),
//   });

//   return (
//     <>
//       <MaterialReactTable table={table} />
//       {creatingCentro && (
//         <Dialog open={creatingCentro} onClose={handleCancelCreateCentroForm}>
//           <DialogTitle className="text-center">Crear Nuevo Centro Form</DialogTitle>
//           <DialogContent>
//             {/* Add create fields as needed */}
//             <TextField
//               className="mt-2"
//               label="Nombre del Centro"
//               name="nombre"
//               value={newCentroData.nombre}
//               onChange={handleInputChangeCentroForm}
//               fullWidth
//             />
//             <TextField
//               className="mt-2"
//               label="Dirección"
//               name="direccion"
//               value={newCentroData.direccion}
//               onChange={handleInputChangeCentroForm}
//               fullWidth
//             />
//             <TextField
//               className="mt-2"
//               label="Teléfono"
//               name="telefono"
//               value={newCentroData.telefono}
//               onChange={handleInputChangeCentroForm}
//               fullWidth
//             />
//             <TextField
//               className="mt-2"
//               label="Persona de Contacto"
//               name="personaContacto"
//               value={newCentroData.personaContacto}
//               onChange={handleInputChangeCentroForm}
//               fullWidth
//             />
//             <TextField
//               className="mt-2"
//               label="CIF"
//               name="cif"
//               value={newCentroData.cif}
//               onChange={handleInputChangeCentroForm}
//               fullWidth
//             />
//             <TextField
//               className="mt-2"
//               label="ID Provincia"
//               name="idProvincia"
//               value={newCentroData.idProvincia}
//               onChange={handleInputChangeCentroForm}
//               fullWidth
//             />
//             <TextField
//               className="mt-2"
//               label="Razón Social"
//               name="razonSocial"
//               value={newCentroData.razonSocial}
//               onChange={handleInputChangeCentroForm}
//               fullWidth
//             />
//             {/* Add more fields as needed */}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCancelCreateCentroForm}>Cancelar</Button>
//             <Button onClick={handleSaveCreateCentroForm}>Guardar</Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </>
//   );
// }

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
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
// } from '@mui/material';
// import {
//   MaterialReactTable,
//   useMaterialReactTable,
// } from 'material-react-table';
// import { Tooltip, IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import { MdDelete } from 'react-icons/md';
// import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
// import { MRT_Localization_ES } from 'material-react-table/locales/es';
// import ApiService from '../../api/ApiService';
// import Loader from '../../components/Loader/Loader'

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

// function GestionCentrosTable() {
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

//   const columns = [
//    {
//     accessorKey: 'idEmpresaCentro',
//     header: 'Centro ID',
//     size: 100,
//   },
//   {
//     accessorKey: 'nombre',
//     header: 'Nombre del Centro',
//   },
//   {
//     accessorKey: 'direccion',
//     header: 'Dirección',
//   },
//   {
//     accessorKey: 'telefono',
//     header: 'Teléfono',
//   },
//   {
//     accessorKey: 'estado',
//     header: 'Estado',
//   },

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

//   const {
//     data: centros = [],
//     isError: isLoadingCentrosError,
//     isFetching: isFetchingCentros,
//     isLoading: isLoadingCentros,
//     refetch: refetchCentros,
//   } = useGetCentros();

//   const handleEditCentro = (centro) => {
//     setEditingCentro(centro);
//   };

//   const handleSaveEdit = async () => {
//     try {
//       await ApiService.updateCentro(editingCentro);
//       setEditingCentro(null);
//       refetchCentros();
//     } catch (error) {
//       console.error('Error al guardar la edición del centro:', error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingCentro(null);
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
//     setNewCentroData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const table = useMaterialReactTable({
//     columns,
//     data: centros,
//     state: {
//       isLoading: isLoadingCentros,
//       showAlertBanner: isLoadingCentrosError,
//       showProgressBars: isFetchingCentros,
//     },
//     localization: MRT_Localization_ES,
//     renderTopToolbarCustomActions: ({ table }) => (
//       <>
//         <Button variant="contained" onClick={handleCreateCentroForm}>
//           Crear Nuevo Centro
//         </Button>
//       </>
//     ),
//   });

//   return (
//     <>
//       <MaterialReactTable table={table} />
//       {creatingCentro && (
//         <Dialog open={creatingCentro} onClose={handleCancelCreateCentroForm}>
//           <DialogTitle className="text-center">
//             Crear Nuevo Centro
//           </DialogTitle>
//           <DialogContent>
//             <TextField
//               className="mt-2"
//               label="Nombre del Centro"
//               name="nombre"
//               value={newCentroData.nombre}
//               onChange={handleInputChangeCentroForm}
//               fullWidth
//             />
//             <TextField
//               className="mt-2"
//               label="Dirección"
//               name="direccion"
//               value={newCentroData.direccion}
//               onChange={handleInputChangeCentroForm}
//               fullWidth
//             />
//             <TextField
//               className="mt-2"
//               label="Teléfono"
//               name="telefono"
//               value={newCentroData.telefono}
//               onChange={handleInputChangeCentroForm}
//               fullWidth
//             />
//             <TextField
//               className="mt-2"
//               label="Persona de Contacto"
//               name="personaContacto"
//               value={newCentroData.personaContacto}
//               onChange={handleInputChangeCentroForm}
//               fullWidth
//             />
//             <TextField
//               className="mt-2"
//               label="CIF"
//               name="cif"
//               value={newCentroData.cif}
//               onChange={handleInputChangeCentroForm}
//               fullWidth
//             />
//             <TextField
//               className="mt-2"
//               label="ID Provincia"
//               name="idProvincia"
//               value={newCentroData.idProvincia}
//               onChange={handleInputChangeCentroForm}
//               fullWidth
//             />
//             <TextField
//               className="mt-2"
//               label="Razón Social"
//               name="razonSocial"
//               value={newCentroData.razonSocial}
//               onChange={handleInputChangeCentroForm}
//               fullWidth
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCancelCreateCentroForm}>Cancelar</Button>
//             <Button onClick={handleSaveCreateCentroForm}>Guardar</Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </>
//   );
// }

// function App() {
//   const queryClient = new QueryClient();

//   return (
//     <QueryClientProvider client={queryClient}>
//       <GestionCentrosTable />
//     </QueryClientProvider>
//   );
// }

// export default App;











// import React, { useEffect, useState, useCallback } from 'react';
// import Service from '../../api/ApiService';
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   IconButton,
//   Tooltip,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import { MaterialReactTable } from 'material-react-table';
// import { MRT_Localization_ES } from 'material-react-table/locales/es';

// const GestionCentrosTable = () => {
//   const [centros, setCentros] = useState([]);
//   const [selectedCentro, setSelectedCentro] = useState(null);
//   const [formData, setFormData] = useState({
//     nombre: '',
//     direccion: '',
//     telefono: '',
//     personaContacto: '',
//     cif: '',
//     idProvincia: 0,
//     razonSocial: '',
//     idTipoEmpresa: 2,
//   });
//   const [openModal, setOpenModal] = useState(false);
//   const [reloadCounter, setReloadCounter] = useState(0); // Estado para forzar la recarga

//   useEffect(() => {
//     const fetchCentrosData = async () => {
//       try {
//         const centrosData = await Service.getCentros();
//         setCentros(centrosData);
//       } catch (error) {
//         console.error('Error al obtener la lista de centros:', error);
//       }
//     };

//     fetchCentrosData();
//   }, [reloadCounter]); // Agrega reloadCounter como dependencia para forzar la recarga

//   const handleShowDetails = (centro) => {
//     setSelectedCentro(centro.idEmpresaCentro);
//     setFormData({ ...centro });
//   };

//   const handleUpdateCentro = async () => {
//     try {
//       await Service.putCentros(formData);
//       console.log('Centro actualizado exitosamente');
//       setOpenModal(false);
//       setReloadCounter((prevCounter) => prevCounter + 1); // Incrementa el contador para recargar
//     } catch (error) {
//       console.error('Error al actualizar el centro:', error);
//     }
//   };

//   const handleOpenModal = (centro) => {
//     setSelectedCentro(centro.idEmpresaCentro);
//     setFormData({ ...centro });
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   const handleCreateCentro = async () => {
//     try {
//       await Service.postCentros(formData);
//       console.log('Centro creado exitosamente');
//       setOpenModal(false);
//       setReloadCounter((prevCounter) => prevCounter + 1); // Incrementa el contador para recargar
//     } catch (error) {
//       console.error('Error al crear el centro:', error);
//     }
//   };

//   const handleDeleteCentro = async (centroId) => {
//     console.log('Centro seleccionado para eliminar:', centroId);
//     if (centroId !== null) {
//       try {
//         await Service.deleteCentro(centroId);
//         console.log('Centro eliminado exitosamente');
//         setOpenModal(false);
//         setReloadCounter((prevCounter) => prevCounter + 1); // Incrementa el contador para recargar
//       } catch (error) {
//         console.error('Error al eliminar el centro:', error);
//       }
//     } else {
//       console.error('No se ha seleccionado ningún centro para eliminar.');
//     }
//   };

//   const renderEditButton = (centro) => (
//     <Tooltip title="Editar">
//       <IconButton onClick={() => handleOpenModal(centro)}>
//         <EditIcon />
//       </IconButton>
//     </Tooltip>
//   );

//   const renderDeleteButton = (centro) => (
//     <Tooltip title="Eliminar">
//       <IconButton onClick={() => handleDeleteCentro(centro)} color="error">
//         <DeleteIcon />
//       </IconButton>
//     </Tooltip>
//   );

//   const renderCreateButton = () => (
//     <Tooltip title="Crear Nuevo Centro">
//       {/* <IconButton onClick={() => setOpenModal(true)}>
//         <AddIcon />
//       </IconButton> */}
//       <Button variant="contained" onClick={() => setOpenModal(true)}>
//            Crear Nuevo Centro
//       </Button>
//     </Tooltip>
//   );

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
//       accessorKey: 'idProvincia',
//       header: 'Provincia',
//     },
//     {
//       accessorKey: 'razonSocial',
//       header: 'Razón Social',
//     },
//     {
//       accessorKey: 'actions',
//       header: 'Acciones',
//       Cell: ({ row }) => (
//         <>
//           {renderEditButton(row.original)}
//           {renderDeleteButton(row.original.idEmpresaCentro)}
//           {/* {renderDeleteButton(row.original.idEmpresaCentro)} */}
//         </>
//       ),
//     },
//   ];

//   return (
//     <>
//       <MaterialReactTable
//         columns={columns}
//         data={centros}
//         state={{
//           showAlertBanner: false, // Puedes manejar esto según tus necesidades
//           initialState: { 
//             columnVisibility: { 'charla.idCharla' : false } 
//           },
//           enableFullScreenToggle: false,
//         }}
//         localization={MRT_Localization_ES}
//         renderTopToolbarCustomActions={({ table }) => renderCreateButton()}
//       />

//       <Dialog open={openModal} onClose={handleCloseModal}>
//         <DialogTitle>{selectedCentro ? 'Editar Centro' : 'Crear Centro'}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Nombre"
//             variant="outlined"
//             fullWidth
//             style={{ marginBottom: 16 }}
//             value={formData.nombre}
//             onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
//           />
//           <TextField
//             label="Dirección"
//             variant="outlined"
//             fullWidth
//             style={{ marginBottom: 16 }}
//             value={formData.direccion}
//             onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
//           />
//           <TextField
//             label="Teléfono"
//             variant="outlined"
//             fullWidth
//             style={{ marginBottom: 16 }}
//             value={formData.telefono}
//             onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
//           />
//           <TextField
//             label="Persona de Contacto"
//             variant="outlined"
//             fullWidth
//             style={{ marginBottom: 16 }}
//             value={formData.personaContacto}
//             onChange={(e) => setFormData({ ...formData, personaContacto: e.target.value })}
//           />
//           <TextField
//             label="CIF"
//             variant="outlined"
//             fullWidth
//             style={{ marginBottom: 16 }}
//             value={formData.cif}
//             onChange={(e) => setFormData({ ...formData, cif: e.target.value })}
//           />
//           <TextField
//             label="ID Provincia"
//             variant="outlined"
//             fullWidth
//             style={{ marginBottom: 16 }}
//             value={formData.idProvincia}
//             onChange={(e) => setFormData({ ...formData, idProvincia: parseInt(e.target.value) })}
//           />
//           <TextField
//             label="Razón Social"
//             variant="outlined"
//             fullWidth
//             style={{ marginBottom: 16 }}
//             value={formData.razonSocial}
//             onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
//           />
//           <TextField
//             label="ID Tipo Empresa"
//             variant="outlined"
//             fullWidth
//             style={{ marginBottom: 16 }}
//             value={formData.idTipoEmpresa}
//             onChange={(e) => setFormData({ ...formData, idTipoEmpresa: parseInt(e.target.value) })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseModal} color="secondary">
//             Cancelar
//           </Button>
//           <Button onClick={selectedCentro ? handleUpdateCentro : handleCreateCentro} color="primary">
//             {selectedCentro ? 'Guardar' : 'Crear'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default GestionCentrosTable;










import React, { useEffect, useState, useCallback } from 'react';
import Service from '../../api/ApiService';
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
      <IconButton onClick={() => handleDeleteCentro(centro)} color="error">
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );

  const renderCreateButton = () => (
    <Tooltip title="Crear Nuevo Centro">
      <Button variant="contained" onClick={() => setOpenModal(true)}>
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
        data={centros}
        state={{
          showAlertBanner: false, // Puedes manejar esto según tus necesidades
        }}
        initialState= { 
          {
            columnVisibility: 
            { 
              'idEmpresaCentro' : false,
              'razonSocial' : false, 
            } 
          }
        }
        enableFullScreenToggle= {false}
        localization={MRT_Localization_ES}
        renderTopToolbarCustomActions={({ table }) => renderCreateButton()}
        paginationDisplayMode = {'pages'}
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