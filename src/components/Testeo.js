// import { useMemo, useState } from 'react';
// import {
//   MRT_EditActionButtons,
//   MaterialReactTable,
//   // createRow,
//   useMaterialReactTable,
// } from 'material-react-table';
// import {
//   Box,
//   Button,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Tooltip,
// } from '@mui/material';
// import {
//   QueryClient,
//   QueryClientProvider,
//   useMutation,
//   useQuery,
//   useQueryClient,
// } from '@tanstack/react-query';
// import { fakeData, usStates } from './makeData';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const Example = () => {
//   const [validationErrors, setValidationErrors] = useState({});

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'id',
//         header: 'Id',
//         enableEditing: false,
//         size: 80,
//       },
//       {
//         accessorKey: 'firstName',
//         header: 'First Name',
//         muiEditTextFieldProps: {
//           type: 'email',
//           required: true,
//           error: !!validationErrors?.firstName,
//           helperText: validationErrors?.firstName,
//           //remove any previous validation errors when user focuses on the input
//           onFocus: () =>
//             setValidationErrors({
//               ...validationErrors,
//               firstName: undefined,
//             }),
//           //optionally add validation checking for onBlur or onChange
//         },
//       },
//       {
//         accessorKey: 'lastName',
//         header: 'Last Name',
//         muiEditTextFieldProps: {
//           type: 'email',
//           required: true,
//           error: !!validationErrors?.lastName,
//           helperText: validationErrors?.lastName,
//           //remove any previous validation errors when user focuses on the input
//           onFocus: () =>
//             setValidationErrors({
//               ...validationErrors,
//               lastName: undefined,
//             }),
//         },
//       },
//       {
//         accessorKey: 'email',
//         header: 'Email',
//         muiEditTextFieldProps: {
//           type: 'email',
//           required: true,
//           error: !!validationErrors?.email,
//           helperText: validationErrors?.email,
//           //remove any previous validation errors when user focuses on the input
//           onFocus: () =>
//             setValidationErrors({
//               ...validationErrors,
//               email: undefined,
//             }),
//         },
//       },
//       {
//         accessorKey: 'state',
//         header: 'State',
//         editVariant: 'select',
//         editSelectOptions: usStates,
//         muiEditTextFieldProps: {
//           select: true,
//           error: !!validationErrors?.state,
//           helperText: validationErrors?.state,
//         },
//       },
//     ],
//     [validationErrors],
//   );

//   //call CREATE hook
//   const { mutateAsync: createUser, isPending: isCreatingUser } =
//     useCreateUser();
//   //call READ hook
//   const {
//     data: fetchedUsers = [],
//     isError: isLoadingUsersError,
//     isFetching: isFetchingUsers,
//     isLoading: isLoadingUsers,
//   } = useGetUsers();
//   //call UPDATE hook
//   const { mutateAsync: updateUser, isPending: isUpdatingUser } =
//     useUpdateUser();
//   //call DELETE hook
//   const { mutateAsync: deleteUser, isPending: isDeletingUser } =
//     useDeleteUser();

//   //CREATE action
//   const handleCreateUser = async ({ values, table }) => {
//     const newValidationErrors = validateUser(values);
//     if (Object.values(newValidationErrors).some((error) => error)) {
//       setValidationErrors(newValidationErrors);
//       return;
//     }
//     setValidationErrors({});
//     await createUser(values);
//     table.setCreatingRow(null); //exit creating mode
//   };

//   //UPDATE action
//   const handleSaveUser = async ({ values, table }) => {
//     const newValidationErrors = validateUser(values);
//     if (Object.values(newValidationErrors).some((error) => error)) {
//       setValidationErrors(newValidationErrors);
//       return;
//     }
//     setValidationErrors({});
//     await updateUser(values);
//     table.setEditingRow(null); //exit editing mode
//   };

//   //DELETE action
//   const openDeleteConfirmModal = (row) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       deleteUser(row.original.id);
//     }
//   };

//   const table = useMaterialReactTable({
//     columns,
//     data: fetchedUsers,
//     createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
//     editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
//     enableEditing: true,
//     getRowId: (row) => row.id,
//     muiToolbarAlertBannerProps: isLoadingUsersError
//       ? {
//           color: 'error',
//           children: 'Error loading data',
//         }
//       : undefined,
//     muiTableContainerProps: {
//       sx: {
//         minHeight: '500px',
//       },
//     },
//     onCreatingRowCancel: () => setValidationErrors({}),
//     onCreatingRowSave: handleCreateUser,
//     onEditingRowCancel: () => setValidationErrors({}),
//     onEditingRowSave: handleSaveUser,
//     //optionally customize modal content
//     renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
//       <>
//         <DialogTitle variant="h3">Create New User</DialogTitle>
//         <DialogContent
//           sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
//         >
//           {internalEditComponents} {/* or render custom edit components here */}
//         </DialogContent>
//         <DialogActions>
//           <MRT_EditActionButtons variant="text" table={table} row={row} />
//         </DialogActions>
//       </>
//     ),
//     //optionally customize modal content
//     renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
//       <>
//         <DialogTitle variant="h3">Edit User</DialogTitle>
//         <DialogContent
//           sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
//         >
//           {internalEditComponents} {/* or render custom edit components here */}
//         </DialogContent>
//         <DialogActions>
//           <MRT_EditActionButtons variant="text" table={table} row={row} />
//         </DialogActions>
//       </>
//     ),
//     renderRowActions: ({ row, table }) => (
//       <Box sx={{ display: 'flex', gap: '1rem' }}>
//         <Tooltip title="Edit">
//           <IconButton onClick={() => table.setEditingRow(row)}>
//             <EditIcon />
//           </IconButton>
//         </Tooltip>
//         <Tooltip title="Delete">
//           <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       </Box>
//     ),
//     renderTopToolbarCustomActions: ({ table }) => (
//       <Button
//         variant="contained"
//         onClick={() => {
//           table.setCreatingRow(true); //simplest way to open the create row modal with no default values
//           //or you can pass in a row object to set default values with the `createRow` helper function
//           // table.setCreatingRow(
//           //   createRow(table, {
//           //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
//           //   }),
//           // );
//         }}
//       >
//         Create New User
//       </Button>
//     ),
//     state: {
//       isLoading: isLoadingUsers,
//       isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
//       showAlertBanner: isLoadingUsersError,
//       showProgressBars: isFetchingUsers,
//     },
//   });

//   return <MaterialReactTable table={table} />;
// };

// //CREATE hook (post new user to api)
// function useCreateUser() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (user) => {
//       //send api update request here
//       await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
//       return Promise.resolve();
//     },
//     //client side optimistic update
//     onMutate: (newUserInfo) => {
//       queryClient.setQueryData(['users'], (prevUsers) => [
//         ...prevUsers,
//         {
//           ...newUserInfo,
//           id: (Math.random() + 1).toString(36).substring(7),
//         },
//       ]);
//     },
//     // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
//   });
// }

// //READ hook (get users from api)
// function useGetUsers() {
//   return useQuery({
//     queryKey: ['users'],
//     queryFn: async () => {
//       //send api request here
//       await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
//       return Promise.resolve(fakeData);
//     },
//     refetchOnWindowFocus: false,
//   });
// }

// //UPDATE hook (put user in api)
// function useUpdateUser() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (user) => {
//       //send api update request here
//       await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
//       return Promise.resolve();
//     },
//     //client side optimistic update
//     onMutate: (newUserInfo) => {
//       queryClient.setQueryData(['users'], (prevUsers) =>
//         prevUsers?.map((prevUser) =>
//           prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
//         ),
//       );
//     },
//     // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
//   });
// }

// //DELETE hook (delete user in api)
// function useDeleteUser() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (userId) => {
//       //send api update request here
//       await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
//       return Promise.resolve();
//     },
//     //client side optimistic update
//     onMutate: (userId) => {
//       queryClient.setQueryData(['users'], (prevUsers) =>
//         prevUsers?.filter((user) => user.id !== userId),
//       );
//     },
//     // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
//   });
// }

// const queryClient = new QueryClient();

// const ExampleWithProviders = () => (
//   //Put this with your other react-query providers near root of your app
//   <QueryClientProvider client={queryClient}>
//     <Example />
//   </QueryClientProvider>
// );

// export default ExampleWithProviders;

// const validateRequired = (value) => !!value.length;
// const validateEmail = (email) =>
//   !!email.length &&
//   email
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//     );

// function validateUser(user) {
//   return {
//     firstName: !validateRequired(user.firstName)
//       ? 'First Name is Required'
//       : '',
//     lastName: !validateRequired(user.lastName) ? 'Last Name is Required' : '',
//     email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
//   };
// }





// import React, { useMemo } from 'react';
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
// import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
// import { FaStar } from 'react-icons/fa';
// import ApiService from '../api/ApiService';
// import { Tooltip, IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { MRT_Localization_ES } from 'material-react-table/locales/es';

// // Hook para leer las charlas completas desde la API
// function useGetCharlasCompletas() {
//   return useQuery({
//     queryKey: ['charlasCompletas'],
//     queryFn: async () => {
//       try {
//         const charlasCompletas = await ApiService.getCharlasCompletas();
//         return charlasCompletas;
//       } catch (error) {
//         console.error('Error al obtener charlas completas:', error);
//         throw new Error('Error al obtener charlas completas');
//       }
//     },
//     refetchOnWindowFocus: false,
//   });
// }

// const CharlasTable = () => {
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'charla.idCharla',
//         header: 'Charla ID',
//         size: 100,
//       },
//       {
//         accessorKey: 'charla.descripcion',
//         header: 'Título',
//       },
//       {
//         accessorKey: 'charla.fechaCharla',
//         header: 'Fecha Charla',
//         Cell: ({ row }) => formatDate(row.original.charla.fechaCharla),
//       },
//       {
//         accessorKey: 'charla.fechaSolicitud',
//         header: 'Fecha Solicitud',
//         Cell: ({ row }) => formatDate(row.original.charla.fechaSolicitud),
//       },
//       {
//         accessorKey: 'valoracion.valoracion',
//         header: 'Valoración',
//         Cell: ({ row }) => (
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             {row.original.valoracion?.valoracion && (
//               [...Array(row.original.valoracion.valoracion)].map((_, index) => (
//                 <FaStar key={index} style={{ color: 'gold', marginRight: '2px' }} />
//               ))
//             )}
//           </div>
//         ),
//       },
//       // {
//       //   accessorKey: 'valoracion.comentario',
//       //   header: 'Comentario Valoración',
//       // },
//       {
//         accessorKey: 'estado.tipo',
//         header: 'Tipo de Estado',
//       },
//       {
//         accessorKey: 'tecnologias',
//         header: 'Tecnologías',
//         Cell: ({ row }) => (
//           <ul>
//             {Array.isArray(row.original.tecnologias) &&
//               row.original.tecnologias.map((tecnologia, index) => (
//                 <li key={index}>
//                   {tecnologia && tecnologia.nombreTecnologia ? tecnologia.nombreTecnologia : (tecnologia || 'Sin nombre')}
//                 </li>
//               ))}
//           </ul>
//         ),
//       },
//       {
//         accessorKey: 'actions',
//         header: 'Acciones',
//         Cell: ({ row }) => (
//           <div style={{ display: 'flex', gap: '1rem' }}>
//             <Tooltip title="Editar">
//               <IconButton onClick={() => handleEditCharla(row.original)}>
//                 <EditIcon />
//               </IconButton>
//             </Tooltip>
//             <Tooltip title="Eliminar">
//               <IconButton color="error" onClick={() => handleDeleteCharla(row.original)}>
//                 <DeleteIcon />
//               </IconButton>
//             </Tooltip>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const {
//     data: charlasCompletas = [],
//     isError: isLoadingCharlasCompletasError,
//     isFetching: isFetchingCharlasCompletas,
//     isLoading: isLoadingCharlasCompletas,
//   } = useGetCharlasCompletas();

//   const handleEditCharla = (charla) => {
//     // Implementa la lógica para editar la charla
//     console.log('Editar charla:', charla);
//   };

//   const handleDeleteCharla = (charla) => {
//     // Implementa la lógica para eliminar la charla
//     if (window.confirm('¿Estás seguro de que quieres eliminar esta charla?')) {
//       console.log('Charla Eliminada:', charla);
//       // Llama a la función de eliminación aquí
//       // Ejemplo: await ApiService.deleteCharla(charla.idCharla);
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return ''; // Maneja el caso en que la fecha sea null o undefined

//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
    
//     return `${day}/${month}/${year}`;
//   };

//   const table = useMaterialReactTable({
//     columns,
//     data: charlasCompletas,
//     muiTableContainerProps: {
//       sx: {
//         minHeight: '500px',
//       },
//     },
//     state: {
//       isLoading: isLoadingCharlasCompletas,
//       showAlertBanner: isLoadingCharlasCompletasError,
//       showProgressBars: isFetchingCharlasCompletas,
//     },
//     initialState: { 
//       columnVisibility: { 'charla.idCharla' : false } 
//     },
//     enableFullScreenToggle: false,
//     localization: MRT_Localization_ES, // Agrega la localización en español
//   });
  
//   return <MaterialReactTable table={table} />;
// };

// const CharlasTableContainer = () => {
//   const queryClient = new QueryClient();

//   return (
//     <QueryClientProvider client={queryClient}>
//       <CharlasTable />
//     </QueryClientProvider>
//   );
// };

// export default CharlasTableContainer;







// import React, { useMemo, useState } from 'react';
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
// import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
// import { FaStar } from 'react-icons/fa';
// import ApiService from '../api/ApiService';
// import { MRT_Localization_ES } from 'material-react-table/locales/es';

// // Función de ejemplo para simular una consulta
// function useGetCharlasCompletas() {
//   return useQuery({
//     queryKey: ['charlasCompletas'],
//     queryFn: async () => {
//       try {
//         // Simular la obtención de datos desde la API
//         const charlasCompletas = await ApiService.getCharlasCompletas();
//         return charlasCompletas;
//       } catch (error) {
//         console.error('Error al obtener charlas completas:', error);
//         throw new Error('Error al obtener charlas completas');
//       }
//     },
//     refetchOnWindowFocus: false,
//   });
// }

// function CharlasTable() {
//   const [editingCharla, setEditingCharla] = useState(null);

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'charla.idCharla',
//         header: 'Charla ID',
//         size: 100,
//       },
//       {
//         accessorKey: 'charla.descripcion',
//         header: 'Título',
//       },
//       {
//         accessorKey: 'charla.fechaCharla',
//         header: 'Fecha Charla',
//         Cell: ({ row }) => formatDate(row.original.charla.fechaCharla),
//       },
//       {
//         accessorKey: 'charla.fechaSolicitud',
//         header: 'Fecha Solicitud',
//         Cell: ({ row }) => formatDate(row.original.charla.fechaSolicitud),
//       },
//       {
//         accessorKey: 'valoracion.valoracion',
//         header: 'Valoración',
//         Cell: ({ row }) => (
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             {row.original.valoracion?.valoracion && (
//               [...Array(row.original.valoracion.valoracion)].map((_, index) => (
//                 <FaStar key={index} style={{ color: 'gold', marginRight: '2px' }} />
//               ))
//             )}
//           </div>
//         ),
//       },
//       {
//         accessorKey: 'estado.tipo',
//         header: 'Tipo de Estado',
//       },
//       {
//         accessorKey: 'tecnologias',
//         header: 'Tecnologías',
//         Cell: ({ row }) => (
//           <ul>
//             {Array.isArray(row.original.tecnologias) &&
//               row.original.tecnologias.map((tecnologia, index) => (
//                 <li key={index}>
//                   {tecnologia && tecnologia.nombreTecnologia ? tecnologia.nombreTecnologia : (tecnologia || 'Sin nombre')}
//                 </li>
//               ))}
//           </ul>
//         ),
//       },
//       {
//         accessorKey: 'actions',
//         header: 'Acciones',
//         Cell: ({ row }) => (
//           <div style={{ display: 'flex', gap: '1rem' }}>
//             <Tooltip title="Editar">
//               <IconButton onClick={() => handleEditCharla(row.original)}>
//                 <EditIcon />
//               </IconButton>
//             </Tooltip>
//             <Tooltip title="Eliminar">
//               <IconButton color="error" onClick={() => handleDeleteCharla(row.original)}>
//                 <DeleteIcon />
//               </IconButton>
//             </Tooltip>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const {
//     data: charlasCompletas = [],
//     isError: isLoadingCharlasCompletasError,
//     isFetching: isFetchingCharlasCompletas,
//     isLoading: isLoadingCharlasCompletas,
//   } = useGetCharlasCompletas();

//   const handleEditCharla = (charla) => {
//     setEditingCharla(charla);
//   };

//   const handleSaveEdit = async () => {
//     // Aquí debes implementar la lógica para guardar la edición
//     console.log('Guardar edición:', editingCharla);
//     // Por ejemplo: await ApiService.updateCharla(editingCharla);
//     setEditingCharla(null);
//   };

//   const handleCancelEdit = () => {
//     setEditingCharla(null);
//   };

//   const handleDeleteCharla = (charla) => {
//     // Implementa la lógica para eliminar la charla
//     if (window.confirm('¿Estás seguro de que quieres eliminar esta charla?')) {
//       console.log('Charla Eliminada:', charla);
//       // Llama a la función de eliminación aquí
//       // Ejemplo: await ApiService.deleteCharla(charla.idCharla);
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return ''; // Maneja el caso en que la fecha sea null o undefined

//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
    
//     return `${day}/${month}/${year}`;
//   };

//   const table = useMaterialReactTable({
//     columns,
//     data: charlasCompletas,
//     state: {
//       isLoading: isLoadingCharlasCompletas,
//       showAlertBanner: isLoadingCharlasCompletasError,
//       showProgressBars: isFetchingCharlasCompletas,
//     },
//     initialState: { 
//       columnVisibility: { 'charla.idCharla' : false } 
//     },
//     enableFullScreenToggle: false,
//     localization: MRT_Localization_ES,
//   });

//   return (
//     <>
//       <MaterialReactTable table={table} />
//       {editingCharla && (
//         <Dialog open={!!editingCharla} onClose={handleCancelEdit}>
//           <DialogTitle>Editar Charla</DialogTitle>
//           <DialogContent>
//             {/* Aquí coloca los campos de edición, por ejemplo: */}
//             <TextField
//               label="Título"
//               value={editingCharla.charla.descripcion}
//               onChange={(e) => setEditingCharla({ ...editingCharla, charla: { ...editingCharla.charla, descripcion: e.target.value } })}
//               fullWidth
//             />
//             {/* Agrega más campos según sea necesario */}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCancelEdit}>Cancelar</Button>
//             <Button onClick={handleSaveEdit}>Guardar</Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </>
//   );
// }

// const CharlasTableContainer = () => {
//   const queryClient = new QueryClient();
  
//   return (
//     <QueryClientProvider client={queryClient}>
//       <CharlasTable />
//     </QueryClientProvider>
//   );
// };

// export default CharlasTableContainer;









  