import React, { useState } from 'react';
import axios from 'axios';
import apiUrl from '../../../api/ApiService';

const CentroForm = () => {
    const [centroData, setCentroData] = useState({
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
        setCentroData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const newCentroData = {
            ...centroData,
            idEmpresaCentro: 0,
            idTipoEmpresa: 2, // idTipoCentro = 2
          };
    
          const token = localStorage.getItem('token');
    
          const response = await axios.post(
            `https://apitechriders.azurewebsites.net/api/empresascentros`,
            newCentroData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (response.status >= 200 && response.status < 300) {
            console.log('Centro creado exitosamente:', response.data);
            // Puedes hacer algo después de que el centro se haya creado con éxito
          } else {
            console.error('Error al crear centro:', response.status);
            // Puedes manejar el error de alguna manera
          }
        } catch (error) {
          console.error('Error al crear centro:', error);
          // Puedes manejar el error de alguna manera
        }
      };

  return (
    <div className="container mt-5">
      <h2>Formulario de Centros</h2>
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
            value={centroData.nombre}
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
            value={centroData.direccion}
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
            value={centroData.telefono}
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
            value={centroData.personaContacto}
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
            value={centroData.cif}
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
            value={centroData.idProvincia}
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
            value={centroData.razonSocial}
            onChange={handleChange}
          />
        </div>       
        <button type="submit" className="btn btn-primary">
          Crear Centro
        </button>
      </form>
    </div>
  );
};

export default CentroForm;
