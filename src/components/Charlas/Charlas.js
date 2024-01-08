import React, { useState, useEffect } from 'react';
import ApiService from '../../api/ApiService';
import Card from 'react-bootstrap/Card';
import { FaStar } from 'react-icons/fa';
import imagen from "../../assets/img/escudo-negro.png";

const Charlas = () => {
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
      {charlasCompletas.map((charlaData, index) => (
        <Card key={index} style={{ maxWidth: '30rem', marginBottom: '20px' }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <Card.Img variant="left" src={imagen} className="img-fluid" />
            </div>
            <div className="col-md-8">
              <Card.Body>
                <Card.Title>{charlaData.charla.descripcion}</Card.Title>
                <Card.Text>
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
                </Card.Text>
              </Card.Body>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Charlas;
