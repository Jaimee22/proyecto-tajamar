// En Pagina1.js

import React, { useEffect, useState } from 'react';
import ApiService from '../api/ApiService';
import BotonVolver from './BotonVolver/BotonVolver';

const Pagina1 = () => {
  const [estadosCharlas, setEstadosCharlas] = useState([]);
  const [charlas, setCharlas] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState('');
  const [noHayDatos, setNoHayDatos] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const estados = await ApiService.getEstadosCharlas();
        setEstadosCharlas(estados);
      } catch (error) {
        console.error('Error al obtener estados de charlas:', error);
      }
    };

    fetchData();
  }, []);

  const handleObtenerCharlasPorEstado = async (estadoId) => {
    try {
      const { estado, charlas } = await ApiService.getCharlasPorEstado(estadoId);
      setCharlas(charlas);
      setNoHayDatos(charlas.length === 0);
    } catch (error) {
      console.error('Error al obtener charlas por estado:', error);
    }
  };

  return (
    <div>
      <BotonVolver/>
      <h1>Página 1</h1>
      <label htmlFor="estadoSelect">Selecciona un estado:</label>
      <select
        id="estadoSelect"
        value={selectedEstado}
        onChange={(e) => {
          setSelectedEstado(e.target.value);
          handleObtenerCharlasPorEstado(e.target.value);
        }}
      >
        <option value="" disabled>
          Selecciona un estado
        </option>
        {estadosCharlas.map((estado) => (
          <option key={estado.idEstadosCharla} value={estado.idEstadosCharla}>
            {estado.tipo}
          </option>
        ))}
      </select>

      <h2>Charlas por estado:</h2>
      {noHayDatos ? (
        <p>No hay charlas en ese estado.</p>
      ) : (
        <ul>
          {charlas.map((charla) => (
            <li key={charla.idCharla}>{charla.idCharla} - {charla.descripcion}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Pagina1;
