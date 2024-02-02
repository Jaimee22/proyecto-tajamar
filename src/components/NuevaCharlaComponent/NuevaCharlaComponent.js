import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import ApiService from '../../api/ApiService';
import './NuevaCharlaComponent.css'

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

class NuevaCharlaComponent extends Component {
  constructor() {
    super();
    this.state = {
      idCharla:0,
      descripcion: '',
      idEstadoCharla: 0,
      fechaCharla: '',
      observaciones: '',
      idTechRider: 0,
      fechaSolicitud: '',
      turno: '',
      modalidad: '',
      acreditacionLinkedIn: '',
      idCurso: 0,
      idProvincia: 0,
      estadosCharla: [],
      cursos: [],
      provincias: [],
    };
  }

  componentDidMount() {
    this.getTechRiderId();
    this.loadEstadosCharla();
    this.loadCursos();
    this.loadProvincias();
  }

  async getTechRiderId() {
    try {
      const perfilUsuario = await ApiService.getPerfilUsuario();
      this.setState({ idTechRider: perfilUsuario.idUsuario });
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
    }
  }

  async loadEstadosCharla() {
    const estadosCharla = await getEstadosCharla();
    this.setState({ estadosCharla });
  }

  async loadCursos() {
    const cursos = await getCursos();
    this.setState({ cursos });
  }

  async loadProvincias() {
    const provincias = await getProvincias();
    this.setState({ provincias });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const charlaData = {
        idCharla: 0,
        descripcion: this.state.descripcion,
        idEstadoCharla: this.state.idEstadoCharla,
        fechaCharla: this.state.fechaCharla,
        observaciones: this.state.observaciones,
        idTechRider: this.state.idTechRider,
        fechaSolicitud: this.state.fechaSolicitud,
        turno: this.state.turno,
        modalidad: this.state.modalidad,
        acreditacionLinkedIn: this.state.acreditacionLinkedIn,
        idCurso: this.state.idCurso,
        idProvincia: this.state.idProvincia,
      };

      const response = await fetch('https://apitechriders.azurewebsites.net/api/Charlas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(charlaData),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        throw new Error(`Error al crear la charla: ${response.statusText}`);
      }

      // Puedes manejar la respuesta como desees (redireccionar, mostrar mensaje, etc.)

    } catch (error) {
      console.error('Error al crear la charla:', error);
    }
  };

  render() {
    return (
      <div className="container-nueva-charla">
        <h1>Nueva Charla</h1>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formDescripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la descripción"
                  name="descripcion"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formEstadoCharla">
                <Form.Label>Estado Charla</Form.Label>
                <Form.Control
                  as="select"
                  name="idEstadoCharla"
                  onChange={this.handleChange}
                >
                  <option value="">Seleccionar estado</option>
                  {this.state.estadosCharla.map((estado) => (
                    <option key={estado.idEstadoCharla} value={estado.idEstadoCharla}>
                      {estado.tipo}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formFechaCharla">
                <Form.Label>Fecha Charla</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaCharla"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formObservaciones">
                <Form.Label>Observaciones</Form.Label>
                <Form.Control
                  type="text"
                  name="observaciones"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Col>

            {/* Campos a la derecha */}
            <Col md={6}>
              <Form.Group controlId="formFechaSolicitud">
                <Form.Label>Fecha Solicitud</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaSolicitud"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formModalidad">
                <Form.Label>Modalidad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ONLINE / PRESENCIAL"
                  name="modalidad"
                  onChange={this.handleChange}
                />
              </Form.Group>

              {/* Agrega más campos según tus necesidades */}

              <Form.Group controlId="formCurso">
                <Form.Label>Curso</Form.Label>
                <Form.Control
                  as="select"
                  name="idCurso"
                  onChange={this.handleChange}
                >
                  <option value="">Selecciona curso</option>
                  {this.state.cursos.map((curso) => (
                    <option key={curso.idCurso} value={curso.idCurso}>
                      {curso.nombreCurso}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formProvincia">
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                  as="select"
                  name="idProvincia"
                  onChange={this.handleChange}
                >
                  <option value="">Selecciona provincia</option>
                  {this.state.provincias.map((provincia) => (
                    <option key={provincia.idProvincia} value={provincia.idProvincia}>
                      {provincia.nombreProvincia}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Button className="mt-3" variant="primary" type="submit">
            Crear Charla
          </Button>
        </Form>
      </div>
    );
  }
}

export default NuevaCharlaComponent;
