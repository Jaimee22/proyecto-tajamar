
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Modal } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './CalendarioCharlas.css';

const CalendarioCharlas = () => {
  const localizer = momentLocalizer(moment);
  const [eventos, setEventos] = useState([]);
  const [charlaSeleccionada, setCharlaSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const obtenerDatosDeAPI = async () => {
      try {
        const respuesta = await fetch('https://apitechriders.azurewebsites.net/api/Charlas');
        const datos = await respuesta.json();

        const eventosCharlas = datos.map((charla) => ({
          title: charla.descripcion,
          start: new Date(charla.fechaCharla),
          end: new Date(charla.fechaCharla),
          charlaInfo: charla,
        }));

        setEventos(eventosCharlas);
      } catch (error) {
        console.error('Error al obtener datos de la API', error);
      }
    };

    obtenerDatosDeAPI();
  }, []);

  const manejarSeleccionDeCharla = (evento) => {
    setCharlaSeleccionada(evento.charlaInfo);
    setShowModal(true);
  };

  return (
    <div>
      <Calendar
        className="estilos-calendario"
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        views={{ month: true, week: false }}
        onSelectEvent={manejarSeleccionDeCharla}
        messages={{
          next: <FaArrowRight size={15} />,
          previous: <FaArrowLeft size={15} />,
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
        }}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Charla</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {charlaSeleccionada && (
            <div>
              <p>ID de Charla: {charlaSeleccionada.idCharla}</p>
              <p>Descripción: {charlaSeleccionada.descripcion}</p>
              <p>Turno: {charlaSeleccionada.turno}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CalendarioCharlas;
