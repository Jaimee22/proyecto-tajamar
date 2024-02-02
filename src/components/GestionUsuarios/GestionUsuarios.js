import React, { useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import ApiService from '../../api/ApiService';
import axios from 'axios'; // Asegúrate de importar axios
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { TiUserDelete } from "react-icons/ti";

function useGetUsuarios() {
  return useQuery({
    queryKey: ['usuarios'],
    queryFn: async () => {
      try {
        const usuarios = await ApiService.getUsuarios();
        return usuarios;
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw new Error('Error al obtener usuarios');
      }
    },
    refetchOnWindowFocus: false,
  });
}

function GestionUsuariosTable() {
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    // ... (campos necesarios para la creación de usuarios)
  });

  const columns = [
    {
      accessorKey: 'idUsuario',
      header: 'Usuario ID',
      size: 100,
    },
    {
      accessorKey: 'nombre',
      header: 'Nombre',
    },
    {
      accessorKey: 'apellidos',
      header: 'Apellidos',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'telefono',
      header: 'Teléfono',
    },
    {
      accessorKey: 'linkedIn',
      header: 'LinkedIn',
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
            <IconButton onClick={() => handleEditUsuario(row.original)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton color="error" onClick={() => handleDeleteUsuario(row.original)}>
              <TiUserDelete size={30} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const {
    data: usuarios = [],
    isError: isLoadingUsuariosError,
    isFetching: isFetchingUsuarios,
    isLoading: isLoadingUsuarios,
  } = useGetUsuarios();

  const handleEditUsuario = (usuario) => {
    setEditingUsuario(usuario);
  };

  const handleSaveEdit = async () => {
    console.log('Guardar edición:', editingUsuario);
    // Implementa la lógica para guardar la edición aquí
    // Por ejemplo: await ApiService.updateUsuario(editingUsuario);
    setEditingUsuario(null);
  };

  const handleCancelEdit = () => {
    setEditingUsuario(null);
  };

  const renderCreateButton = () => (
    <Tooltip title="Crear Nuevo Usuario">
      <Button variant="contained" onClick={handleCreateUsuario}>
        Crear Nuevo Usuario
      </Button>
    </Tooltip>
  );

  const handleDeleteUsuario = (usuario) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      console.log('Usuario Eliminado:', usuario);
      // Implementa la lógica para eliminar el usuario aquí
      // Ejemplo: await ApiService.deleteUsuario(usuario.idUsuario);
    }
  };

  const handleCreateUsuario = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleSaveCreateUsuario = async () => {
    console.log('Guardar creación:', formData);
    // Implementa la lógica para guardar la creación aquí
    // Por ejemplo: await ApiService.createUsuario(formData);
    setOpenCreateModal(false);
  };

  const table = useMaterialReactTable({
    columns,
    data: usuarios,
    state: {
      isLoading: isLoadingUsuarios,
      showAlertBanner: isLoadingUsuariosError,
      showProgressBars: isFetchingUsuarios,
    },
    localization: MRT_Localization_ES,
  });

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={usuarios}
        localization={MRT_Localization_ES}
        renderTopToolbarCustomActions={({ table }) => renderCreateButton()}
        // ... (otras configuraciones de la tabla)
      />
      {editingUsuario && (
        <Dialog open={!!editingUsuario} onClose={handleCancelEdit}>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogContent>
            {/* Agrega los campos de edición según sea necesario */}
            <TextField
              label="Nombre"
              value={editingUsuario.nombre}
              onChange={(e) => setEditingUsuario({ ...editingUsuario, nombre: e.target.value })}
              fullWidth
            />
            {/* Agrega más campos según sea necesario */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelEdit}>Cancelar</Button>
            <Button onClick={handleSaveEdit}>Guardar</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

const GestionUsuarios = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GestionUsuariosTable />
    </QueryClientProvider>
  );
};

export default GestionUsuarios;
