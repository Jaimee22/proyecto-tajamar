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
  const [openModal, setOpenModal] = useState(false);
  const [reloadCounter, setReloadCounter] = useState(0); // Estado para forzar la recarga

  useEffect(() => {
    const fetchEmpresasData = async () => {
      try {
        const EmpresasData = await Service.getEmpresas();
        setEmpresas(EmpresasData);
      } catch (error) {
        console.error('Error al obtener la lista de Empresas:', error);
      }
    };

    fetchEmpresasData();
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
      await Service.postEmpresas(formData);
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
        data={Empresas}
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

export default GestionEmpresasTable;