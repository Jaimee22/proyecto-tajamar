import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FaStar } from 'react-icons/fa';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './GestionCharlas.css'
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';


const GestionCharlas = () => {
  const [charlas, setCharlas] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [formData, setFormData] = useState({
    descripcionCharla: '',
    fechaCharla: '',

  });
  const [selectedCharlaId, setSelectedCharlaId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [reloadCounter, setReloadCounter] = useState(0);
  const [selectedProvincia, setSelectedProvincia] = useState('');
  const [estadosCharla, setEstadosCharla] = useState([]);
  const [techRiders, setTechRiders] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [selectedTurno, setSelectedTurno] = useState('');
  const [selectedModalidad, setSelectedModalidad] = useState('');
  const [editingCharlaData, setEditingCharlaData] = useState({});
  const [selectedProvinciaEdit, setSelectedProvinciaEdit] = useState('');
  const [selectedTechRiderEdit, setSelectedTechRiderEdit] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const charlasData = await getCharlas();
        const provinciasData = await getProvincias();
        const estadosCharlaData = await getEstadosCharla();
        const techRidersData = await getTechRiders();
        const cursos = await getCursos();

        setCharlas(charlasData);
        setProvincias(provinciasData);
        setEstadosCharla(estadosCharlaData);
        setTechRiders(techRidersData);
        setCursos(cursos);
        setSelectedTurno('');
        setSelectedModalidad('');

      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [reloadCounter]);

  const getEstadosCharla = async () => {
    try {
      const response = await fetch('https://apitechriders.azurewebsites.net/api/EstadosCharlas');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener estados de charla:', error);
      return [];
    }
  };

  const getCursos = async () => {
    try {
      const response = await fetch("https://apitechriders.azurewebsites.net/api/Cursos");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los cursos: ', error);
      return [];
    }
  }

  const getTechRiders = async () => {
    try {
      const response = await fetch('https://apitechriders.azurewebsites.net/api/QueryTools/TodosTechRidersActivos');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener tech riders:', error);
      return [];
    }
  };

  const getCharlas = async () => {
    try {
      const response = await fetch('https://apitechriders.azurewebsites.net/api/QueryTools/CharlasViewAll');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener charlas:', error);
      return [];
    }
  };

  const getProvincias = async () => {
    try {
      const response = await fetch('https://apitechriders.azurewebsites.net/api/Provincias');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener provincias:', error);
      return [];
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return '';
      }

      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return '';
    }
  };


  const createCharla = async (charlaData) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('https://apitechriders.azurewebsites.net/api/Charlas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(charlaData),
      });

      if (!response.ok) {
        throw new Error(`Error al crear la charla: ${response.statusText}`);
      }

      setReloadCounter((prevCounter) => prevCounter + 1);
      setOpenCreateModal(false);
    } catch (error) {
      console.error('Error al crear la charla:', error);
    }
  };

  const updateCharla = async (charlaData) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`https://apitechriders.azurewebsites.net/api/Charlas/${selectedCharlaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(charlaData),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar la charla: ${response.statusText}`);
      }

      setReloadCounter((prevCounter) => prevCounter + 1);
      setOpenEditModal(false);
    } catch (error) {
      console.error('Error al actualizar la charla:', error);
    }
  };

  const deleteCharla = async (charlaId) => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await axios.delete(`https://apitechriders.azurewebsites.net/api/Charlas/${charlaId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status !== 200) {
        throw new Error(`Error al eliminar la charla: ${response.statusText}`);
      }
  
      setReloadCounter((prevCounter) => prevCounter + 1);
      console.log('Charla eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar la charla:', error);
    }
  };

  const handleOpenCreateModal = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    setFormData({
      idCharla: 1,
      descripcionCharla: '',
      fechaCharla: formattedDate,
      idEstadoCharla: '',
      observaciones: '',
      idTechRider: '',
      fechaSolicitud: formattedDate,
      turno: '',
      modalidad: '',
      acreditacionLinkedIn: '',
      idCurso: '',
    });

    setSelectedProvincia('');
    setSelectedTurno('');
    setSelectedModalidad('');
    setOpenCreateModal(true);
  };

  const handleCreateCharla = async () => {
    try {
      await createCharla({ ...formData, idProvincia: selectedProvincia, turno: selectedTurno, modalidad: selectedModalidad });
      console.log('Charla creada exitosamente');

      // Muestra el toast después de crear la charla
      toast.success('Se ha creado la charla de forma correcta', { duration: 5000 });

      setOpenCreateModal(false);
    } catch (error) {
      console.error('Error al crear la charla:', error);
    }
  };


  const handleOpenEditModal = async (idCharla) => {
    try {
      const token = localStorage.getItem('token');

      // Hacer una solicitud para obtener los detalles de la charla específica
      const response = await fetch(`https://apitechriders.azurewebsites.net/api/Charlas/${idCharla}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener detalles de la charla: ${response.statusText}`);
      }

      const charlaDetails = await response.json();

      // Actualizar el estado con los detalles de la charla
      setEditingCharlaData({
        idCharla: charlaDetails.idCharla,
        descripcionCharla: charlaDetails.descripcion,
        fechaCharla: charlaDetails.fechaCharla,
        idEstadoCharla: charlaDetails.idEstadoCharla,
        observaciones: charlaDetails.observaciones,
        idTechRider: charlaDetails.idTechRider,
        fechaSolicitud: charlaDetails.fechaSolicitud,
        turno: charlaDetails.turno,
        modalidad: charlaDetails.modalidad,
        acreditacionLinkedIn: charlaDetails.acreditacionLinkedIn,
        idCurso: charlaDetails.idCurso,
        idProvincia: charlaDetails.idProvincia,
        // Agrega más campos según sea necesario
      });

      setOpenEditModal(true);
    } catch (error) {
      console.error('Error al abrir el modal de edición:', error);
    }
  };




  const handleCloseModal = () => {
    setSelectedCharlaId(null);
    setOpenCreateModal(false);
    setOpenEditModal(false);
  };

  const handleEditCharlaFieldChange = (field, value) => {
    setEditingCharlaData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleEditCharla = (charla) => {
    // setEditingCharla(charla);

  };

  const handleUpdateCharla = async () => {
    try {
      const token = localStorage.getItem('token');

      // Agrega el contenido del cuerpo de la solicitud
      const charlaData = {
        idCharla: editingCharlaData.idCharla,
        descripcion: editingCharlaData.descripcionCharla,
        idEstadoCharla: editingCharlaData.idEstadoCharla,
        fechaCharla: editingCharlaData.fechaCharla,
        observaciones: editingCharlaData.observaciones,
        idTechRider: editingCharlaData.idTechRider,
        fechaSolicitud: editingCharlaData.fechaSolicitud,
        turno: editingCharlaData.turno,
        modalidad: editingCharlaData.modalidad,
        acreditacionLinkedIn: editingCharlaData.acreditacionLinkedIn,
        idCurso: editingCharlaData.idCurso,
        idProvincia: editingCharlaData.idProvincia,
      };

      const response = await fetch(`https://apitechriders.azurewebsites.net/api/Charlas`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(charlaData), // Convierte el objeto a JSON
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar la charla: ${response.statusText}`);
      }

      // Realiza las acciones necesarias después de la actualización
      setReloadCounter((prevCounter) => prevCounter + 1);

      // Cierra el modal de edición después de actualizar y realizar otras acciones si es necesario
      setOpenEditModal(false);
      toast.success('Se ha editado la charla de forma correcta', { duration: 5000 });

    } catch (error) {
      console.error('Error al actualizar la charla:', error);
    }
  };


  const handleDeleteCharla = async (idCharla) => {
    if (idCharla !== null) {
      // Mostrar mensaje de confirmación
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede revertir. ¿Quieres continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });
  
      if (result.isConfirmed) {
        await deleteCharla(idCharla);
        console.log('Charla eliminada exitosamente');
        Swal.fire('Eliminado', 'La charla ha sido eliminada correctamente.', 'success');
        setReloadCounter((prevCounter) => prevCounter + 1);
      }
    } else {
      console.error('No se ha seleccionado ninguna charla para eliminar.');
    }
  };
  

  const renderCreateButton = () => (
    <Tooltip title="Crear Nueva Charla">
      <Button variant="contained" onClick={handleOpenCreateModal}>
        <AddIcon /> Crear Nueva Charla
      </Button>
    </Tooltip>
  );

  const columns = [
    {
      accessorKey: 'idCharla',
      header: 'Charla ID',
      size: 100,
    },
    {
      accessorKey: 'descripcionCharla',
      header: 'Título',
    },
    {
      accessorKey: 'fechaCharla',
      header: 'Fecha Charla',
      Cell: ({ row }) => formatDate(row.original.fechaCharla),
    },
    {
      accessorKey: 'fechaSolicitudCharla',
      header: 'Fecha Solicitud',
      Cell: ({ row }) => formatDate(row.original.fechaSolicitudCharla),
    },
    {
      accessorKey: 'valoracion',
      header: 'Valoración',
      Cell: ({ row }) => {
        const valoracion = parseInt(row.original.valoracion);

        if (isNaN(valoracion)) {
          return null; // O cualquier otro valor predeterminado si no es un número
        }

        const stars = Array.from({ length: valoracion }, (_, index) => (
          <FaStar key={index} style={{ color: 'gold', marginRight: '2px' }} />
        ));

        return <div style={{ display: 'flex', alignItems: 'center' }}>{stars}</div>;
      },
    },

    {
      accessorKey: 'estadoCharla',
      header: 'Tipo de Estado',
      Cell: ({ row }) => {
        const estadoCharla = row.original.estadoCharla;

        let color;
        let backgroundColor;
        let borderRadius;

        if (estadoCharla === 'PROCESO') {
          color = '#d09306';
          // backgroundColor = '#f7d547';
          backgroundColor = '#FFFF36';
          borderRadius = '10px'; // ajusta el valor según sea necesario
        } else if (estadoCharla === 'COMPLETADA') {
          color = 'green';
          backgroundColor = 'lightgreen';
          borderRadius = '10px'; // ajusta el valor según sea necesario
        } else if (estadoCharla === 'ACREDITADA') {
          color = '#007FFF';
          backgroundColor = 'lightblue';
          borderRadius = '10px'; // ajusta el valor según sea necesario
        } else if (estadoCharla === 'CANCELADA') {
          color = '#5c0010';
          backgroundColor = '#e4717a';
          borderRadius = '10px'; // ajusta el valor según sea necesario
        }
        else if (estadoCharla === 'PENDIENTE') {
          color = 'black';
          backgroundColor = '#C8C8C8';
          borderRadius = '10px'; // ajusta el valor según sea necesario
        }
        else {
          color = 'black';
          backgroundColor = 'white';
          borderRadius = '4px'; // ajusta el valor según sea necesario
        }

        const style = {
          color,
          backgroundColor,
          borderRadius,
          padding: '5px', // ajusta el valor según sea necesario
          width: '70%', // nuevo estilo para el ancho
          justifyContent: 'center', // nuevo estilo para centrar horizontalmente
          display: 'flex', // para que justifyContent funcione
        };

        return <div style={style}>{estadoCharla}</div>;
      },
    },



    {
      accessorKey: 'provincia',
      header: 'Provincia',
    },
    {
      accessorKey: 'nombreCurso',
      header: 'Nombre del Curso',
    },
    {
      accessorKey: 'observacionesCharla',
      header: 'Observaciones',
    },
    {
      accessorKey: 'modalidad',
      header: 'Modalidad',
    },
    {
      accessorKey: 'techRider',
      header: 'Tech Rider',
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
      accessorKey: 'tipoRole',
      header: 'Tipo de Role',
    },
    {
      accessorKey: 'comentarioValoracion',
      header: 'Comentario de Valoración',
    },
    {
      accessorKey: 'actions',
      header: 'Acciones',
      Cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Tooltip title="Editar">
            <IconButton onClick={() => handleOpenEditModal(row.original.idCharla)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton color="error" onClick={() => handleDeleteCharla(row.original.idCharla)}>
              <DeleteIcon />
            </IconButton>
        </Tooltip>

        </div>

      ),
    }
  ];


  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={charlas}
        localization={MRT_Localization_ES}
        renderTopToolbarCustomActions={({ table }) => renderCreateButton()}
        initialState={{
          columnVisibility: {
            'idCharla': false,
            'tipoRole': false,
            'comentarioValoracion': false,
            'fechaSolicitudCharla': false,
            'email': false,
            'telefono': false,
            'nombreCurso': false,
            'observacionesCharla': false
          },
        }}
        enableFullScreenToggle={false}
        paginationDisplayMode={'pages'}
      />

      <Dialog open={openCreateModal} onClose={handleCloseModal}>
        <DialogTitle>Crear Nueva Charla</DialogTitle>
        <DialogContent className='modalcrearcharlas-admin'>
          {/* <div className="d-flex flex-column align-items-center">
            <div className="mb-3">ID Charla:</div>
            <input
              type="number"
              className="form-control"
              value={formData.idCharla}
              onChange={(e) => setFormData({ ...formData, idEstadoCharla: parseInt(e.target.value) })}
            />
          </div> */}
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3">Descripción Charla:</div>
            <input
              type="text"
              className="form-control"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            />
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3">Fecha Charla:</div>
            <input
              type="date"
              className="form-control"
              value={formData.fechaCharla}
              onChange={(e) => setFormData({ ...formData, fechaCharla: e.target.value })}
            />
          </div>
          {/* <div className="d-flex flex-column align-items-center">
            <div className="mb-3">ID Estado Charla:</div>
            <input
              type="number"
              className="form-control"
              value={formData.idEstadoCharla}
              onChange={(e) => setFormData({ ...formData, idEstadoCharla: parseInt(e.target.value) })}
            />
          </div> */}
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3">Estado de la Charla:</div>
            <FormControl fullWidth>
              <Select
                value={formData.idEstadoCharla}
                onChange={(e) => setFormData({ ...formData, idEstadoCharla: parseInt(e.target.value) })}
              >
                {estadosCharla.map((estado) => (
                  <MenuItem key={estado.idEstadosCharla} value={estado.idEstadosCharla}>
                    {estado.tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3">Observaciones:</div>
            <input
              type="text"
              className="form-control"
              value={formData.observaciones}
              onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
            />
          </div>
          {/* <div className="d-flex flex-column align-items-center">
            <div className="mb-3">ID Tech Rider:</div>
            <input
              type="number"
              className="form-control"
              value={formData.idTechRider}
              onChange={(e) => setFormData({ ...formData, idTechRider: parseInt(e.target.value) })}
            />
          </div> */}
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3">TechRider:</div>
            <FormControl fullWidth>
              <Select
                value={formData.idTechRider}
                onChange={(e) => setFormData({ ...formData, idTechRider: parseInt(e.target.value) })}
              >
                {techRiders.map((techRider) => (
                  <MenuItem key={techRider.idTechRider} value={techRider.idTechRider}>
                    {techRider.techRider} {/* Ajusta el nombre de la propiedad según la respuesta de la API */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* <div className="d-flex flex-column align-items-center">
            <div className="mb-3">Fecha Solicitud:</div>
            <input
              type="date"
              className="form-control"
              value={formData.fechaSolicitud}
              onChange={(e) => setFormData({ ...formData, fechaSolicitud: e.target.value })}
            />
          </div> */}
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3">Turno:</div>
            <FormControl fullWidth>
              <Select
                value={selectedTurno}
                onChange={(e) => setSelectedTurno(e.target.value)}
              >
                <MenuItem value="MAÑANA">Mañana</MenuItem>
                <MenuItem value="TARDE">Tarde</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3">Modalidad:</div>
            <FormControl fullWidth>
              <Select
                value={selectedModalidad}
                onChange={(e) => setSelectedModalidad(e.target.value)}
              >
                <MenuItem value="PRESENCIAL">Presencial</MenuItem>
                <MenuItem value="ONLINE">Online</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3">Acreditación LinkedIn:</div>
            <input
              type="text"
              className="form-control"
              value={formData.acreditacionLinkedIn}
              onChange={(e) => setFormData({ ...formData, acreditacionLinkedIn: e.target.value })}
            />
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3">Curso:</div>
            <FormControl fullWidth>
              <Select
                value={formData.idCurso}
                onChange={(e) => setFormData({ ...formData, idCurso: parseInt(e.target.value) })}
              >
                {cursos.map((cursos) => (
                  <MenuItem key={cursos.idCurso} value={cursos.idCurso}>
                    {cursos.nombreCurso} {/* Ajusta el nombre de la propiedad según la respuesta de la API */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* <div className="d-flex flex-column align-items-center">
            <div className="mb-3">ID Curso:</div>
            <input
              type="number"
              className="form-control"
              value={formData.idCurso}
              onChange={(e) => setFormData({ ...formData, idCurso: parseInt(e.target.value) })}
            />
          </div> */}
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3">Provincia:</div>
            <FormControl fullWidth>
              <Select
                value={selectedProvincia}
                onChange={(e) => setSelectedProvincia(e.target.value)}
              >
                {provincias.map((provincia) => (
                  <MenuItem key={provincia.idProvincia} value={provincia.idProvincia}>
                    {provincia.nombreProvincia}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleCreateCharla}>Crear</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openEditModal} onClose={handleCloseModal}>
        <DialogTitle>Editar Charla</DialogTitle>
        <DialogContent className='modalcrearcharlas-admin'>
          <div className="d-flex flex-column align-items-center mb-3">
            <label className="mb-2">Descripción Charla:</label>
            <input
              type="text"
              className="form-control"
              value={editingCharlaData?.descripcionCharla || ''}
              onChange={(e) => handleEditCharlaFieldChange('descripcionCharla', e.target.value)}
            />
          </div>
          <div className="d-flex flex-column align-items-center mb-3">
            <label className="mb-2">Fecha Charla:</label>
            <input
              type="date"
              className="form-control"
              value={editingCharlaData?.fechaCharla || ''}
              onChange={(e) => handleEditCharlaFieldChange('fechaCharla', e.target.value)}
            />
          </div>
          <div className="d-flex flex-column align-items-center mb-3">
            <label className="mb-2">ID Estado Charla:</label>
            <input
              type="number"
              className="form-control"
              value={editingCharlaData?.idEstadoCharla || ''}
              onChange={(e) => handleEditCharlaFieldChange('idEstadoCharla', parseInt(e.target.value))}
            />
          </div>
          <div className="d-flex flex-column align-items-center mb-3">
            <label className="mb-2">Observaciones:</label>
            <input
              type="text"
              className="form-control"
              value={editingCharlaData?.observaciones || ''}
              onChange={(e) => handleEditCharlaFieldChange('observaciones', e.target.value)}
            />
          </div>
          <div className="d-flex flex-column align-items-center mb-3">
            <label className="mb-2">ID Tech Rider:</label>
            <input
              type="number"
              className="form-control"
              value={editingCharlaData?.idTechRider || ''}
              onChange={(e) => handleEditCharlaFieldChange('idTechRider', parseInt(e.target.value))}
            />
          </div>
          <div className="d-flex flex-column align-items-center mb-3">
            <label className="mb-2">Fecha Solicitud:</label>
            <input
              type="date"
              className="form-control"
              value={editingCharlaData?.fechaSolicitud || ''}
              onChange={(e) => handleEditCharlaFieldChange('fechaSolicitud', e.target.value)}
            />
          </div>
          <div className="d-flex flex-column align-items-center mb-3">
            <label className="mb-2">Turno:</label>
            <input
              type="text"
              className="form-control"
              value={editingCharlaData?.turno || ''}
              onChange={(e) => handleEditCharlaFieldChange('turno', e.target.value)}
            />
          </div>
          <div className="d-flex flex-column align-items-center mb-3">
            <label className="mb-2">Modalidad:</label>
            <input
              type="text"
              className="form-control"
              value={editingCharlaData?.modalidad || ''}
              onChange={(e) => handleEditCharlaFieldChange('modalidad', e.target.value)}
            />
          </div>
          <div className="d-flex flex-column align-items-center mb-3">
            <label className="mb-2">Acreditación LinkedIn:</label>
            <input
              type="text"
              className="form-control"
              value={editingCharlaData?.acreditacionLinkedIn || ''}
              onChange={(e) => handleEditCharlaFieldChange('acreditacionLinkedIn', e.target.value)}
            />
          </div>
          <div className="d-flex flex-column align-items-center mb-3">
            <label className="mb-2">ID Curso:</label>
            <input
              type="number"
              className="form-control"
              value={editingCharlaData?.idCurso || ''}
              onChange={(e) => handleEditCharlaFieldChange('idCurso', parseInt(e.target.value))}
            />
          </div>
          <div className="d-flex flex-column align-items-center mb-3">
            <label className="mb-2">ID Provincia:</label>
            <input
              type="number"
              className="form-control"
              value={editingCharlaData?.idProvincia || ''}
              onChange={(e) => handleEditCharlaFieldChange('idProvincia', parseInt(e.target.value))}
            />
          </div>
          {/* Completa más campos según sea necesario */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleUpdateCharla}>Actualizar</Button>
        </DialogActions>
      </Dialog>
      <Toaster position="top-right" />
    </>
  );
};

export default GestionCharlas;
