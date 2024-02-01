import React, { useState } from 'react';
import axios from 'axios';
import ApiService from '../../../api/ApiService';

const RegistroEmpresas = () => {
    const [empresaData, setEmpresaData] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        personaContacto: '',
        cif: '',
        idProvincia: 0,
        razonSocial: '',
        estadoEmpresa: 0,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setEmpresaData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const newEmpresaData = {
            ...empresaData,
            idEmpresaCentro: 0,
            idTipoEmpresa: 1,
          };
    
          const token = localStorage.getItem('token');
    
          const response = await axios.post(
            `https://apitechriders.azurewebsites.net/api/empresascentros`,
            newEmpresaData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (response.status >= 200 && response.status < 300) {
            console.log('Empresa creada exitosamente:', response.data);
            // Puedes hacer algo después de que la empresa se haya creado con éxito
          } else {
            console.error('Error al crear empresa:', response.status);
            // Puedes manejar el error de alguna manera
          }
        } catch (error) {
          console.error('Error al crear empresa:', error);
          // Puedes manejar el error de alguna manera
        }
      };

  return (
    <div className="container mt-5">
      <h2>Formulario de Empresas</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={empresaData.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">
            Dirección
          </label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            name="direccion"
            value={empresaData.direccion}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono
          </label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            name="telefono"
            value={empresaData.telefono}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="personaContacto" className="form-label">
            Persona de Contacto
          </label>
          <input
            type="text"
            className="form-control"
            id="personaContacto"
            name="personaContacto"
            value={empresaData.personaContacto}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cif" className="form-label">
            CIF
          </label>
          <input
            type="text"
            className="form-control"
            id="cif"
            name="cif"
            value={empresaData.cif}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="idProvincia" className="form-label">
            ID de Provincia
          </label>
          <input
            type="number"
            className="form-control"
            id="idProvincia"
            name="idProvincia"
            value={empresaData.idProvincia}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="razonSocial" className="form-label">
            Razón Social
          </label>
          <input
            type="text"
            className="form-control"
            id="razonSocial"
            name="razonSocial"
            value={empresaData.razonSocial}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Crear Empresa
        </button>
      </form>
    </div>
  );
};

export default RegistroEmpresas;
