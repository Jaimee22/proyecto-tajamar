import React, { useState, useEffect } from 'react';
import ApiService from '../api/ApiService';

const Pagina1 = () => {
  const [charlasCompletas, setCharlasCompletas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [charlasData, tecnologiasData] = await Promise.all([
          ApiService.getCharlasCompletas(),
          ApiService.getTecnologiasCharla(),
        ]);

        const charlasConTecnologias = await Promise.all(
          charlasData.map(async ({ charla, estado, valoracion }) => {
            const tecnologias = await Promise.all(
              tecnologiasData
                .filter(tecnologia => tecnologia.idCharla === charla.idCharla)
                .map(async tecnologia => {
                  const tecnologiaInfo = await ApiService.getTecnologiaName(tecnologia.idTecnologia);
                  return tecnologiaInfo ? tecnologiaInfo.nombreTecnologia : null;
                })
            );

            return {
              charla,
              estado,
              valoracion,
              tecnologias,
            };
          })
        );

        setCharlasCompletas(charlasConTecnologias);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Charlas Completas con Estado, Valoración y Tecnologías</h2>
      {charlasCompletas.map(({ charla, estado, valoracion, tecnologias }) => (
        <div key={charla.idCharla}>
          <h3>{charla.descripcion}</h3>
          <p>ID de Charla: {charla.idCharla}</p>
          <p>Fecha: {charla.fechaCharla}</p>

          {estado && (
            <div>
              <h4>Estado</h4>
              <p>ID de Estado: {estado.idEstadosCharla}</p>
              <p>Tipo: {estado.tipo}</p>
            </div>
          )}

          {valoracion && (
            <div>
              <h4>Valoración</h4>
              <p>ID de Valoración: {valoracion.idValoracion}</p>
              <p>Valoración: {valoracion.valoracion}</p>
              <p>Comentario: {valoracion.comentario}</p>
            </div>
          )}

          {tecnologias.length > 0 && (
            <div>
              <h4>Tecnologías</h4>
              <ul>
                {tecnologias.map(nombreTecnologia => (
                  <li key={nombreTecnologia}>{nombreTecnologia}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Agrega más campos según sea necesario */}
          <h1>________________________________</h1>
        </div>
      ))}
    </div>
  );
};

export default Pagina1;
