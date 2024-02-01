import React, { Component } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { BsCalendar, BsGeoAlt, BsFileText, BsClock, BsPerson, BsEnvelope, BsPhone, BsStar, BsChatDots } from "react-icons/bs";
import Loader from "../Loader/Loader";
import { Button, Modal } from "react-bootstrap";
import "./CharlasActivas.css";
import ApiService from "../../api/ApiService";

export default class CharlasActivas extends Component {
  constructor() {
    super();
    this.state = {
      charlasActivas: [],
      idTechrider: 0,
      usuario: {
        idUsuario: 0,
      },
      isLoading: true,
      showModal: false,
      selectedCharla: null,
    };
  }

  componentDidMount() {
    this.getUsuario();
  }

  async getUsuario() {
    try {
      const perfilUser = await ApiService.getPerfilUsuario();
      this.setState(
        { usuario: perfilUser, idTechrider: perfilUser.idUsuario },
        () => {
          console.log("IdTechRider: " + this.state.idTechrider);
          this.fetchCharlasActivas();
        }
      );
    } catch (error) {
      console.error("Error al obtener las charlas:", error);
      this.setState({ isLoading: false });
    }
  }

  async fetchCharlasActivas() {
    try {
      let idTechRider = this.state.idTechrider;
      console.log("Id del techrider: " + idTechRider);
      const charlas = await ApiService.getCharlasByTechrider(idTechRider);
      const charlasActivas = charlas.filter(
        (charla) =>
          charla.estadoCharla === "PENDIENTE" ||
          charla.estadoCharla === "PROCESO"
      );
      this.setState({ charlasActivas, isLoading: false });
    } catch (error) {
      console.error("Error al obtener las charlas:", error);
      this.setState({ isLoading: false });
    }
  }

  handleShowModal = (charla) => {
    this.setState({ showModal: true, selectedCharla: charla });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedCharla: null });
  };

  render() {
    return (
      <div className="container-charlas-activas">
        <h1 className="charlas-titulo">Charlas Activas</h1>
        {this.state.isLoading ? (
          <Loader />
        ) : this.state.charlasActivas.length > 0 ? (
          <div className="charlas-container">
            {this.state.charlasActivas.map((charla) => (
              <div key={charla.idCharla} className="charlas-card">
                <div className="charlas-info">
                  <p className="charlas-titulo-item">
                    <BsFileText /> {charla.descripcionCharla || "No disponible"}
                  </p>
                  <p className="charlas-fecha">
                    <BsCalendar /> {charla.fechaCharla || "No disponible"}
                  </p>
                  <p className="charlas-estado">
                    <BsChatDots /> {charla.estadoCharla || "No disponible"}
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => this.handleShowModal(charla)}
                  >
                    Ver Detalles
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="sin-charlas">
            <p>
              <RiErrorWarningLine size={20} className="sin-charlas-icon" /> No
              hay charlas activas para este TechRider
            </p>
          </div>
        )}

<Modal show={this.state.showModal} onHide={this.handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Detalles de la Charla</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.selectedCharla && (
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <BsFileText /> Descripción:{" "}
                    {this.state.selectedCharla.descripcionCharla}
                  </p>
                  <p>
                    <BsCalendar /> Fecha de Charla:{" "}
                    {this.state.selectedCharla.fechaCharla}
                  </p>
                  <p>
                    <BsChatDots /> Estado:{" "}
                    {this.state.selectedCharla.estadoCharla}
                  </p>
                  <p>
                    <BsGeoAlt /> Provincia:{" "}
                    {this.state.selectedCharla.provincia}
                  </p>
                  <p>
                    <BsFileText /> Nombre del Curso:{" "}
                    {this.state.selectedCharla.nombreCurso}
                  </p>
                  <p>
                    <BsFileText /> Observaciones:{" "}
                    {this.state.selectedCharla.observacionesCharla}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <BsClock /> Fecha de Solicitud:{" "}
                    {this.state.selectedCharla.fechaSolicitudCharla}
                  </p>
                  <p>
                    <BsFileText /> Modalidad:{" "}
                    {this.state.selectedCharla.modalidad}
                  </p>
                  <p>
                    <BsPerson /> TechRider:{" "}
                    {this.state.selectedCharla.techRider}
                  </p>
                  <p>
                    <BsEnvelope /> Email: {this.state.selectedCharla.email}
                  </p>
                  <p>
                    <BsPhone /> Teléfono: {this.state.selectedCharla.telefono}
                  </p>
                  <p>
                    <BsStar /> Valoración:{" "}
                    {this.state.selectedCharla.valoracion}
                  </p>
                  {/* <p>
                    <BsChatDots /> Comentario de Valoración:{" "}
                    {this.state.selectedCharla.comentarioValoracion}
                  </p> */}
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
