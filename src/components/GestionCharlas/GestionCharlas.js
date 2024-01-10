import React, { useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { FaStar } from 'react-icons/fa';
import ApiService from '../../api/ApiService';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

// Función de ejemplo para simular una consulta
function useGetCharlasCompletas() {
  return useQuery({
    queryKey: ['charlasCompletas'],
    queryFn: async () => {
      try {
        // Simular la obtención de datos desde la API
        const charlasCompletas = await ApiService.getCharlasCompletas();
        return charlasCompletas;
      } catch (error) {
        console.error('Error al obtener charlas completas:', error);
        throw new Error('Error al obtener charlas completas');
      }
    },
    refetchOnWindowFocus: false,
  });
}

function GestionCharlasTable() {
  const [editingCharla, setEditingCharla] = useState(null);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'charla.idCharla',
        header: 'Charla ID',
        size: 100,
      },
      {
        accessorKey: 'charla.descripcion',
        header: 'Título',
      },
      {
        accessorKey: 'charla.fechaCharla',
        header: 'Fecha Charla',
        Cell: ({ row }) => formatDate(row.original.charla.fechaCharla),
      },
      {
        accessorKey: 'charla.fechaSolicitud',
        header: 'Fecha Solicitud',
        Cell: ({ row }) => formatDate(row.original.charla.fechaSolicitud),
      },
      {
        accessorKey: 'valoracion.valoracion',
        header: 'Valoración',
        Cell: ({ row }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {row.original.valoracion?.valoracion && (
              [...Array(row.original.valoracion.valoracion)].map((_, index) => (
                <FaStar key={index} style={{ color: 'gold', marginRight: '2px' }} />
              ))
            )}
          </div>
        ),
      },
      {
        accessorKey: 'estado.tipo',
        header: 'Tipo de Estado',
      },
      {
        accessorKey: 'tecnologias',
        header: 'Tecnologías',
        Cell: ({ row }) => (
          <ul>
            {Array.isArray(row.original.tecnologias) &&
              row.original.tecnologias.map((tecnologia, index) => (
                <li key={index}>
                  {tecnologia && tecnologia.nombreTecnologia ? tecnologia.nombreTecnologia : (tecnologia || 'Sin nombre')}
                </li>
              ))}
          </ul>
        ),
      },
      {
        accessorKey: 'actions',
        header: 'Acciones',
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Tooltip title="Editar">
              <IconButton onClick={() => handleEditCharla(row.original)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton color="error" onClick={() => handleDeleteCharla(row.original)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        ),
      },
    ],
    []
  );

  const {
    data: charlasCompletas = [],
    isError: isLoadingCharlasCompletasError,
    isFetching: isFetchingCharlasCompletas,
    isLoading: isLoadingCharlasCompletas,
  } = useGetCharlasCompletas();

  const handleEditCharla = (charla) => {
    setEditingCharla(charla);
  };

  const handleSaveEdit = async () => {
    // Aquí debes implementar la lógica para guardar la edición
    console.log('Guardar edición:', editingCharla);
    // Por ejemplo: await ApiService.updateCharla(editingCharla);
    setEditingCharla(null);
  };

  const handleCancelEdit = () => {
    setEditingCharla(null);
  };

  const handleDeleteCharla = (charla) => {
    // Implementa la lógica para eliminar la charla
    if (window.confirm('¿Estás seguro de que quieres eliminar esta charla?')) {
      console.log('Charla Eliminada:', charla);
      // Llama a la función de eliminación aquí
      // Ejemplo: await ApiService.deleteCharla(charla.idCharla);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return ''; // Maneja el caso en que la fecha sea null o undefined

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  const table = useMaterialReactTable({
    columns,
    data: charlasCompletas,
    state: {
      isLoading: isLoadingCharlasCompletas,
      showAlertBanner: isLoadingCharlasCompletasError,
      showProgressBars: isFetchingCharlasCompletas,
    },
    initialState: { 
      columnVisibility: { 'charla.idCharla' : false } 
    },
    enableFullScreenToggle: false,
    localization: MRT_Localization_ES,
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {editingCharla && (
        <Dialog open={!!editingCharla} onClose={handleCancelEdit}>
          <DialogTitle>Editar Charla</DialogTitle>
          <DialogContent>
            {/* Aquí coloca los campos de edición, por ejemplo: */}
            <TextField
              label="Título"
              value={editingCharla.charla.descripcion}
              onChange={(e) => setEditingCharla({ ...editingCharla, charla: { ...editingCharla.charla, descripcion: e.target.value } })}
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

const GestionCharlas = () => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <GestionCharlasTable />
    </QueryClientProvider>
  );
};

export default GestionCharlas;

