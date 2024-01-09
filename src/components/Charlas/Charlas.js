import React, { useState, useEffect } from 'react';
import ApiService from '../../api/ApiService';
import { FaStar } from 'react-icons/fa';
import imagen from "../../assets/img/escudo-negro.png";
import Loader from "../Loader/Loader"

const Charlas = () => {
  const [charlasCompletas, setCharlasCompletas] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false); // Marcar como no cargando cuando se han obtenido los datos
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setLoading(false); // Marcar como no cargando incluso si hay un error
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
          charlasCompletas.map((charlaData, index) => (
          <div className='card-container-principal' key={index}>
            <div className='card-container'>
              <div className='cadr-container-img'>
                <img src={imagen} alt='imagen_card'/>
              </div>
              <div className='card-body'>
                <h1 className='card-title'>{charlaData.charla.descripcion}</h1>
                <div className='card-text'>
                  {charlaData.valoracion && (
                        <div>
                          <h4>Valoración</h4>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            {[...Array(charlaData.valoracion.valoracion)].map((_, index) => (
                              <FaStar key={index} style={{ color: 'gold', marginRight: '2px' }} />
                            ))}
                          </div>
                        </div>
                      )}

                      {charlaData.estado && (
                        <div>
                          <h4>Estado</h4>
                          <p>Tipo: {charlaData.estado.tipo}</p>
                        </div>
                      )}

                      {charlaData.tecnologias.length > 0 && (
                        <div>
                          <h4>Tecnología</h4>
                          <ul>
                            {charlaData.tecnologias.map((nombreTecnologia, index) => (
                              <li key={index}>{nombreTecnologia}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      </div>
   );
};

export default Charlas;  
