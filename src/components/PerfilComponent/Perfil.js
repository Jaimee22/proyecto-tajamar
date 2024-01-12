import React, { Component } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import ApiService from "../../api/ApiService";
import "./Perfil.css";

export default class Perfil extends Component {
  state = {
    usuario: {
      idUsuario: 0,
      nombre: "",
      apellidos: "",
      email: "",
      telefono: "",
      linkedIn: "",
      password: "",
      idRole: 0,
      idProvincia: 0,
      idEmpresaCentro: 0,
      estado: 0,
    },
    provincias: [],
    empresasCentros: [],
    nuevaPassword: "",
    confirmarNuevaPassword: "",
    isEditMode: true,
    showPassword: false,
    showModal: false,
  };

  componentDidMount() {
    this.loadUserProfile();
    this.loadProvincias();
    this.loadEmpresasCentro();
  }

  // async loadUserProfile() {
  //   try {
  //     const userProfile = await ApiService.getPerfilUsuario();
  //     this.setState({ usuario: userProfile });
  //   } catch (error) {
  //     console.error("Error al cargar el perfil del usuario:", error);
  //   }
  // }

  async loadUserProfile() {
    try {
      const userProfile = await ApiService.getPerfilUsuario();
      this.setState({
        usuario: userProfile,
        idProvincia: userProfile.idProvincia,
        idEmpresaCentro: userProfile.idEmpresaCentro,
      });
    } catch (error) {
      console.error("Error al cargar el perfil del usuario:", error);
    }
  }

  async loadProvincias() {
    try {
      const provincias = await ApiService.getProvincias();
      this.setState({ provincias });
    } catch (error) {
      console.error("Error al cargar las provincias:", error);
    }
  }

  async loadEmpresasCentro() {
    try {
      const empresasCentros = await ApiService.getEmpresasCentro();
      this.setState({ empresasCentros });
    } catch (error) {
      console.error("Error al cargar las empresas centros:", error);
    }
  }

  handleSaveClick = async () => {
    try {
      const { usuario, nuevaPassword, confirmarNuevaPassword } = this.state;

      if (nuevaPassword !== confirmarNuevaPassword) {
        console.error("Las contraseñas no coinciden.");
        return;
      }

      if (nuevaPassword !== "") {
        usuario.password = nuevaPassword;
      }

      await ApiService.updateUser(usuario);
      await this.loadUserProfile();

      this.setState({ isEditMode: false });
    } catch (error) {
      console.error("Error al guardar el perfil del usuario:", error);
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      usuario: {
        ...prevState.usuario,
        [name]: value,
      },
    }));
  };

  // handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   this.setState({
  //     ...this.state,
  //     [name]: value,
  //   });
  // };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleModalSave = async () => {
    try {
      const { nuevaPassword, confirmarNuevaPassword, usuario } = this.state;

      if (nuevaPassword !== confirmarNuevaPassword) {
        console.error("Las contraseñas no coinciden.");
        return;
      }

      if (nuevaPassword !== "") {
        usuario.password = nuevaPassword;
        await ApiService.updateUser(usuario);
        await this.loadUserProfile();
      }

      this.closeModal();
    } catch (error) {
      console.error("Error al guardar la nueva contraseña:", error);
    }
  };

  render() {
    const {
      usuario,
      nuevaPassword,
      confirmarNuevaPassword,
      isEditMode,
      showPassword,
      showModal,
      provincias,
      empresasCentros,
    } = this.state;

    return (
      <Container>
        <h1>Perfil</h1>
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={usuario.nombre}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formApellidos">
                <Form.Label>Apellidos:</Form.Label>
                <Form.Control
                  type="text"
                  name="apellidos"
                  value={usuario.apellidos}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={usuario.email}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formTelefono">
                <Form.Label>Teléfono:</Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={usuario.telefono}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formLinkedIn">
                <Form.Label>LinkedIn:</Form.Label>
                <Form.Control
                  type="text"
                  name="linkedIn"
                  value={usuario.linkedIn}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formNuevaPassword">
                <Form.Label>Contraseña Actual:</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="nuevaPassword"
                    value={usuario.password}
                    onChange={this.handleInputChange}
                  />
                  <div className="input-group-append">
                    <Button
                      variant="link"
                      className="password-toggle"
                      onClick={this.togglePasswordVisibility}
                    >
                      <FaEye />
                    </Button>
                  </div>
                </div>
                <Button variant="link" onClick={this.openModal}>
                  Cambiar contraseña
                </Button>
              </Form.Group>
            </Col>
            <Col md={4}>
              <h4>Falta meter los 2 select de empresas/centros y provincias</h4>
            </Col>
          </Row>
          <Button onClick={this.handleSaveClick} variant="outline-primary">
            Modificar Perfil
          </Button>
        </Form>

        <Modal show={showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Cambiar Contraseña</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formNuevaPasswordModal">
              <Form.Label>Nueva Contraseña:</Form.Label>
              <Form.Control
                type="password"
                name="nuevaPassword"
                value={nuevaPassword}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmarNuevaPasswordModal">
              <Form.Label>Confirmar Nueva Contraseña:</Form.Label>
              <Form.Control
                type="password"
                name="confirmarNuevaPassword"
                value={confirmarNuevaPassword}
                onChange={this.handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.closeModal}>
              Cancelar
            </Button>
            <Button variant="success" onClick={this.handleModalSave}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}
