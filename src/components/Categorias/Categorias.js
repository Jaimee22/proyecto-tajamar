import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Categorias.css'

// EL EDITAR CATEGORIA ME DA ERROR 401

const Categorias = () => {
    const [tecnologias, setTecnologias] = useState([]);
    const [tipoTecnologias, setTipoTecnologias] = useState([]);
    const [formData, setFormData] = useState({
        nombreTecnologia: '',
        idTipoTecnologia: '',
    });
    const [selectedTecnologiaId, setSelectedTecnologiaId] = useState(null);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [reloadCounter, setReloadCounter] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tecnologiasData = await getTecnologias();
                const tipoTecnologiasData = await getTipoTecnologias();

                const tecnologiasConDescripcion = tecnologiasData.map((tecnologia) => {
                    const tipoTecnologia = tipoTecnologiasData.find(
                        (tipo) => tipo.idTipoTecnologia === tecnologia.idTipoTecnologia
                    );
                    return {
                        ...tecnologia,
                        idTipoTecnologia: tipoTecnologia ? tipoTecnologia.descripcion : '',
                    };
                });

                setTecnologias(tecnologiasConDescripcion);
                setTipoTecnologias(tipoTecnologiasData);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, [reloadCounter]);

    const getTecnologias = async () => {
        try {
            const response = await fetch('https://apitechriders.azurewebsites.net/api/Tecnologias');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener tecnologias:', error);
            return [];
        }
    };

    const getTipoTecnologias = async () => {
        try {
            const response = await fetch('https://apitechriders.azurewebsites.net/api/TipoTecnologias');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener tipo tecnologias:', error);
            return [];
        }
    };

    const createTecnologia = async (tecnologiaData) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Datos que se van a insertar en la API:', tecnologiaData);

            const response = await fetch('https://apitechriders.azurewebsites.net/api/Tecnologias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(tecnologiaData),
            });

            if (!response.ok) {
                throw new Error(`Error al crear la tecnologia: ${response.statusText}`);
            }

            setReloadCounter((prevCounter) => prevCounter + 1);
            setOpenCreateModal(false);
        } catch (error) {
            console.error('Error al crear la tecnologia:', error);
        }
    };

    const updateTecnologia = async (tecnologiaData) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Datos que se van a actualizar en la API:', tecnologiaData);

            // Obtener el idTipoTecnologia correspondiente al nombre proporcionado
            const tipoTecnologiaCorrespondiente = tipoTecnologias.find(
                (tipo) => tipo.descripcion === tecnologiaData.idTipoTecnologia
            );

            if (!tipoTecnologiaCorrespondiente) {
                throw new Error('No se encontró el idTipoTecnologia correspondiente al nombre proporcionado.');
            }

            const response = await fetch(`https://apitechriders.azurewebsites.net/api/Tecnologias/${selectedTecnologiaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...tecnologiaData,
                    idTipoTecnologia: tipoTecnologiaCorrespondiente.idTipoTecnologia,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error al actualizar la tecnologia: ${response.statusText}`);
            }

            setReloadCounter((prevCounter) => prevCounter + 1);
            setOpenEditModal(false);
        } catch (error) {
            console.error('Error al actualizar la tecnologia:', error);
        }
    };

    const deleteTecnologia = async (tecnologiaId) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Tecnologia seleccionada para eliminar:', tecnologiaId);

            const response = await fetch(`https://apitechriders.azurewebsites.net/api/Tecnologias/${tecnologiaId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error al eliminar la tecnologia: ${response.statusText}`);
            }

            setReloadCounter((prevCounter) => prevCounter + 1);
            console.log('Tecnologia eliminada exitosamente');
        } catch (error) {
            console.error('Error al eliminar la tecnologia:', error);
        }
    };

    const handleOpenCreateModal = () => {
        setFormData({
            nombreTecnologia: '',
            idTipoTecnologia: '',
        });
        setOpenCreateModal(true);
    };

    const handleOpenEditModal = (tecnologia) => {
        setFormData({
            nombreTecnologia: tecnologia.nombreTecnologia,
            idTipoTecnologia: tecnologia.idTipoTecnologia,
        });
        setSelectedTecnologiaId(tecnologia.idTecnologia);
        setOpenEditModal(true);
    };

    const handleCloseModal = () => {
        setSelectedTecnologiaId(null);
        setOpenCreateModal(false);
        setOpenEditModal(false);
    };

    const handleCreateTecnologia = async () => {
        try {
            await createTecnologia(formData);
            console.log('Tecnologia creada exitosamente');
            setOpenCreateModal(false);
        } catch (error) {
            console.error('Error al crear la tecnologia:', error);
        }
    };

    const handleUpdateTecnologia = async () => {
        try {
            await updateTecnologia(formData);
            console.log('Tecnologia actualizada exitosamente');
            setOpenEditModal(false);
        } catch (error) {
            console.error('Error al actualizar la tecnologia:', error);
        }
    };

    const handleDeleteTecnologia = async (tecnologiaId) => {
        if (tecnologiaId !== null) {
            await deleteTecnologia(tecnologiaId);
            console.log('Tecnologia eliminada exitosamente');
        } else {
            console.error('No se ha seleccionado ninguna tecnologia para eliminar.');
        }
    };

    const renderCreateButton = () => (
        <Tooltip title="Crear Nueva Categoría">
            <Button variant="contained" onClick={handleOpenCreateModal}>
                Crear Nueva Categoría
            </Button>
        </Tooltip>
    );

    const columns = [
        {
            accessorKey: 'idTecnologia',
            header: 'ID Categoría',
        },
        {
            accessorKey: 'nombreTecnologia',
            header: 'Nombre Categoría',
        },
        {
            accessorKey: 'idTipoTecnologia',
            header: 'Tipo Categoría',
        },
        {
            accessorKey: 'actions',
            header: 'Acciones',
            Cell: ({ row }) => (
                <>
                    <Tooltip title="Editar">
                        <IconButton onClick={() => handleOpenEditModal(row.original)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <IconButton onClick={() => handleDeleteTecnologia(row.original.idTecnologia)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ];

    return (
        <>
            <MaterialReactTable
                columns={columns}
                data={tecnologias}
                localization={MRT_Localization_ES}
                renderTopToolbarCustomActions={({ table }) => renderCreateButton()}
                initialState={{
                    columnVisibility: {
                        'idTecnologia': false,
                    },
                }}
                enableFullScreenToggle={false}
                paginationDisplayMode={'pages'}
            />

            <Dialog open={openCreateModal} onClose={handleCloseModal}>
                <DialogTitle>Crear Nueva Tecnología</DialogTitle>
                <DialogContent>
                    <div className="d-flex flex-column align-items-center">
                        <div className="mb-3">Nombre Tecnología:</div>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.nombreTecnologia}
                            onChange={(e) => setFormData({ ...formData, nombreTecnologia: e.target.value })}
                        />
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <div className="mb-3">Tipo Tecnología:</div>
                        <select
                            className="form-select"
                            value={formData.idTipoTecnologia}
                            onChange={(e) => {
                                console.log('Valor seleccionado en el select:', e.target.value);
                                setFormData({ ...formData, idTipoTecnologia: e.target.value });
                            }}
                        >
                            <option value="" disabled hidden>Seleccionar Tecnología</option>
                            {tipoTecnologias.map((tipo) => (
                                <option key={tipo.idTipoTecnologia} value={tipo.idTipoTecnologia}>
                                    {tipo.descripcion}
                                </option>
                            ))}
                        </select>

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancelar</Button>
                    <Button onClick={handleCreateTecnologia}>Crear Tecnología</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEditModal} onClose={handleCloseModal}>
                <DialogTitle>Editar Tecnología</DialogTitle>
                <DialogContent>
                    <div className="d-flex flex-column align-items-center mb-3">
                        <label className="mb-2">Nombre Tecnología:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.nombreTecnologia}
                            onChange={(e) => setFormData({ ...formData, nombreTecnologia: e.target.value })}
                        />
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <label className="mb-2">Tipo Tecnología:</label>
                        <select
                            className="form-select"
                            value={formData.idTipoTecnologia}
                            onChange={(e) => {
                                console.log('Valor seleccionado en el select:', e.target.value);
                                setFormData({ ...formData, idTipoTecnologia: e.target.value });
                            }}
                        >
                            {tipoTecnologias.map((tipo) => (
                                <option key={tipo.idTipoTecnologia} value={tipo.idTipoTecnologia}>
                                    {tipo.descripcion}
                                </option>
                            ))}
                        </select>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancelar</Button>
                    <Button onClick={handleUpdateTecnologia}>Actualizar Tecnología</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Categorias;
