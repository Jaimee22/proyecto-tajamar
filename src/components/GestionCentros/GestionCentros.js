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










import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Tooltip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { MdDelete } from 'react-icons/md';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import ApiService from '../../api/ApiService';
import Loader from '../../components/Loader/Loader'

function useGetCentros() {
  return useQuery({
    queryKey: ['centros'],
    queryFn: async () => {
      try {
        const centros = await ApiService.getCentros();
        return centros;
      } catch (error) {
        console.error('Error fetching centros:', error);
        throw new Error('Error fetching centros');
      }
    },
    refetchOnWindowFocus: false,
  });
}

function GestionCentrosTable() {
  const [editingCentro, setEditingCentro] = useState(null);
  const [creatingCentro, setCreatingCentro] = useState(false);
  const [newCentroData, setNewCentroData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    personaContacto: '',
    cif: '',
    idProvincia: 7,
    razonSocial: '',
    idTipoCentro: 2,
  });

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
      accessorKey: 'actions',
      header: 'Acciones',
      Cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Tooltip title="Editar">
            <IconButton onClick={() => handleEditCentro(row.original)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton
              color="error"
              onClick={() => handleDeleteCentro(row.original)}
            >
              <MdDelete size={30} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const {
    data: centros = [],
    isError: isLoadingCentrosError,
    isFetching: isFetchingCentros,
    isLoading: isLoadingCentros,
    refetch: refetchCentros,
  } = useGetCentros();

  const handleEditCentro = (centro) => {
    setEditingCentro(centro);
  };

  const handleSaveEdit = async () => {
    try {
      await ApiService.updateCentro(editingCentro);
      setEditingCentro(null);
      refetchCentros();
    } catch (error) {
      console.error('Error al guardar la edición del centro:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCentro(null);
  };

  const handleDeleteCentro = async (centro) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este centro?')) {
      try {
        await ApiService.deleteCentro(centro.idEmpresaCentro);
        console.log('Centro eliminado:', centro);
        refetchCentros();
      } catch (error) {
        console.error('Error al eliminar el centro:', error);
      }
    }
  };
  

  const handleCreateCentroForm = () => {
    setCreatingCentro(true);
  };

  const handleSaveCreateCentroForm = async () => {
    try {
      await ApiService.postCentros(newCentroData);
      console.log('Nuevo Centro creado:', newCentroData);
      setCreatingCentro(false);
      refetchCentros();
    } catch (error) {
      console.error('Error al crear el centro:', error);
    }
  };

  const handleCancelCreateCentroForm = () => {
    setCreatingCentro(false);
  };

  const handleInputChangeCentroForm = (e) => {
    const { name, value } = e.target;
    setNewCentroData((prevData) => ({ ...prevData, [name]: value }));
  };

  const table = useMaterialReactTable({
    columns,
    data: centros,
    state: {
      isLoading: isLoadingCentros,
      showAlertBanner: isLoadingCentrosError,
      showProgressBars: isFetchingCentros,
    },
    localization: MRT_Localization_ES,
    renderTopToolbarCustomActions: ({ table }) => (
      <>
        <Button variant="contained" onClick={handleCreateCentroForm}>
          Crear Nuevo Centro
        </Button>
      </>
    ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {creatingCentro && (
        <Dialog open={creatingCentro} onClose={handleCancelCreateCentroForm}>
          <DialogTitle className="text-center">
            Crear Nuevo Centro
          </DialogTitle>
          <DialogContent>
            <TextField
              className="mt-2"
              label="Nombre del Centro"
              name="nombre"
              value={newCentroData.nombre}
              onChange={handleInputChangeCentroForm}
              fullWidth
            />
            <TextField
              className="mt-2"
              label="Dirección"
              name="direccion"
              value={newCentroData.direccion}
              onChange={handleInputChangeCentroForm}
              fullWidth
            />
            <TextField
              className="mt-2"
              label="Teléfono"
              name="telefono"
              value={newCentroData.telefono}
              onChange={handleInputChangeCentroForm}
              fullWidth
            />
            <TextField
              className="mt-2"
              label="Persona de Contacto"
              name="personaContacto"
              value={newCentroData.personaContacto}
              onChange={handleInputChangeCentroForm}
              fullWidth
            />
            <TextField
              className="mt-2"
              label="CIF"
              name="cif"
              value={newCentroData.cif}
              onChange={handleInputChangeCentroForm}
              fullWidth
            />
            <TextField
              className="mt-2"
              label="ID Provincia"
              name="idProvincia"
              value={newCentroData.idProvincia}
              onChange={handleInputChangeCentroForm}
              fullWidth
            />
            <TextField
              className="mt-2"
              label="Razón Social"
              name="razonSocial"
              value={newCentroData.razonSocial}
              onChange={handleInputChangeCentroForm}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelCreateCentroForm}>Cancelar</Button>
            <Button onClick={handleSaveCreateCentroForm}>Guardar</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GestionCentrosTable />
    </QueryClientProvider>
  );
}

export default App;
