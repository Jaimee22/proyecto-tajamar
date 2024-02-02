import React, { Component } from 'react';
import './AdminPanel.css';  // Asegúrate de importar el archivo CSS adecuado con los estilos que proporcionaste
import { FaUsers, FaSignOutAlt, FaSchool } from "react-icons/fa";
import { RiSpeakLine } from "react-icons/ri";
import { PiBuildingsDuotone } from "react-icons/pi";
import { FaClipboardList } from "react-icons/fa";
import { BsEnvelopePaper } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";


class AdminPanel extends Component {

    handleLogout = () => {
        // Elimina el token del localStorage
        localStorage.removeItem('token');

        // Redirige a la página de inicio
        window.location.href = '/';
    };

    render() {
        return (
            <body>
                <main>
                    <section className="projects">
                        <div className="projects__header">
                            <h1 className="projects__heading">Panel de Administrador</h1>
                        </div>
                        <div className="projects__project-list">
                            <Link to="/pagina-admin-solicitudes" class="projects__project">
                                <div class="projects__icon projects__icon--fifth">
                                    <CgProfile className='custom-icon' />
                                    {/* <svg width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z" /><path d="M14 2v6h6M8 13h2m-2 4h2m4-4h2m-2 4h2" /></g></svg> */}
                                </div>
                                <div class="projects__body">
                                    <h2 class="projects__title">Editar Perfil</h2>
                                    {/* <p class="projects__description">Harness the power of data with this versatile spreadsheet creator, enabling you to organize, analyze, and visualize information for effective decision-making.</p> */}
                                </div>
                            </Link>
                            <Link to="/pagina-admin-gestion-charlas" class="projects__project">
                                <div class="projects__icon projects__icon--first">
                                    <RiSpeakLine className='custom-icon' />
                                    {/* <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M8 14q-.425 0-.712-.288T7 13q0-.425.288-.712T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14m4 0q-.425 0-.712-.288T11 13q0-.425.288-.712T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14m4 0q-.425 0-.712-.288T15 13q0-.425.288-.712T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z"/></svg> */}
                                </div>
                                <div class="projects__body">
                                    <h2 class="projects__title">Gestionar Charlas</h2>
                                    {/* <p class="projects__description">Plan your days with precision using this feature-rich calendar creator, seamlessly scheduling events and staying organized with ease.</p> */}
                                </div>
                            </Link>
                            <Link to="/pagina-admin-categorias" class="projects__project">
                                <div class="projects__icon projects__icon--fourth">
                                    <FaClipboardList className='custom-icon' />
                                    {/* <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M5.615 20q-.69 0-1.152-.462Q4 19.075 4 18.385V5.615q0-.69.463-1.152Q4.925 4 5.615 4h12.77q.69 0 1.152.463q.463.462.463 1.152v12.77q0 .69-.462 1.152q-.463.463-1.153.463zm0-1H11.5V5H5.615q-.23 0-.423.192Q5 5.385 5 5.615v12.77q0 .23.192.423q.193.192.423.192m6.885 0h5.885q.23 0 .423-.192q.192-.193.192-.423V12h-6.5zm0-8H19V5.615q0-.23-.192-.423Q18.615 5 18.385 5H12.5z" /></svg> */}
                                </div>
                                <div class="projects__body">
                                    <h2 class="projects__title">Categorías (Tecnologías)</h2>
                                    {/* <p class="projects__description">Foster collaboration and idea-sharing with this dynamic board creator, ideal for project management, brainstorming, and visual collaboration.</p> */}
                                </div>
                            </Link>
                            <Link to="/pagina-admin-gestion-usuarios" class="projects__project">
                                <div class="projects__icon projects__icon--second">
                                    <FaUsers className="custom-icon" />
                                    {/* <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M4 17.27v-1h16v1zm0-4.77v-1h16v1zm0-4.77v-1h16v1z"/></svg> */}
                                </div>
                                <div class="projects__body">
                                    <h2 class="projects__title">Gestionar Usuarios</h2>
                                    {/* <p class="projects__description">Craft organized, itemized inventories or to-do lists effortlessly with this intuitive tool for streamlined task management.</p> */}
                                </div>
                            </Link>
                            <Link to="/pagina-admin-gestion-empresa" class="projects__project">
                                <div class="projects__icon projects__icon--third">
                                    <PiBuildingsDuotone className='custom-icon' />
                                    {/* <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#FFFFFF" fill-rule="evenodd" d="M11.943 1.25h.114c2.309 0 4.118 0 5.53.19c1.444.194 2.584.6 3.479 1.494c.895.895 1.3 2.035 1.494 3.48c.19 1.411.19 3.22.19 5.529v.088c0 1.909 0 3.471-.104 4.743c-.104 1.28-.317 2.347-.795 3.235c-.21.391-.47.742-.785 1.057c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.793-.793-1.203-1.78-1.42-3.006c-.215-1.203-.254-2.7-.262-4.558c-.002-.473-.002-.973-.002-1.501v-.058c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19m-5.33 1.676c-1.278.172-2.049.5-2.618 1.069c-.57.57-.897 1.34-1.069 2.619c-.174 1.3-.176 3.008-.176 5.386c0 .529 0 1.026.002 1.495c.008 1.874.05 3.246.238 4.303c.184 1.035.498 1.7 1.005 2.207c.57.57 1.34.897 2.619 1.069c1.3.174 3.008.176 5.386.176s4.086-.002 5.386-.176c1.279-.172 2.05-.5 2.62-1.069c.21-.21.381-.442.524-.707c.332-.616.523-1.44.621-2.645c.098-1.205.099-2.707.099-4.653c0-2.378-.002-4.086-.176-5.386c-.172-1.279-.5-2.05-1.069-2.62c-.57-.569-1.34-.896-2.619-1.068c-1.3-.174-3.008-.176-5.386-.176s-4.086.002-5.386.176" clip-rule="evenodd" /><path fill="#FFFFFF" d="m21.249 13.28l-.222-.03c-2.844-.394-5.446 1.084-6.772 3.313c-1.71-4.325-6.227-7.275-11.274-6.55l-.226.032c-.005.597-.005 1.246-.005 1.955c0 .529 0 1.026.002 1.495c.008 1.874.05 3.246.238 4.303c.184 1.035.498 1.7 1.005 2.207c.57.57 1.34.897 2.619 1.069c1.3.174 3.008.176 5.386.176s4.086-.002 5.386-.176c1.279-.172 2.05-.5 2.62-1.069c.21-.21.381-.442.524-.707c.332-.616.523-1.44.621-2.645c.076-.926.093-2.028.098-3.373" opacity=".5" /><path fill="#FFFFFF" d="M18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0" /></svg> */}
                                </div>
                                <div class="projects__body">
                                    <h2 class="projects__title">Gestionar Empresas</h2>
                                    {/* <p class="projects__description">Bring your visual stories to life with this gallery maker, curating stunning collections of images and videos effortlessly for a captivating display.</p> */}
                                </div>
                            </Link>
                            <Link to="/pagina-admin-gestion-centro" class="projects__project">
                                <div class="projects__icon projects__icon--sixth">
                                    <FaSchool className='custom-icon' />
                                    {/* <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M12 22q-1.875 0-3.512-.712t-2.85-1.925q-1.213-1.213-1.925-2.85T3 13q0-1.875.713-3.512t1.924-2.85q1.213-1.213 2.85-1.925T12 4q1.875 0 3.513.713t2.85 1.925q1.212 1.212 1.925 2.85T21 13q0 1.875-.712 3.513t-1.925 2.85q-1.213 1.212-2.85 1.925T12 22m2.8-4.8l1.4-1.4l-3.2-3.2V8h-2v5.4zM5.6 2.35L7 3.75L2.75 8l-1.4-1.4zm12.8 0l4.25 4.25l-1.4 1.4L17 3.75zM12 20q2.925 0 4.963-2.037T19 13q0-2.925-2.037-4.962T12 6Q9.075 6 7.038 8.038T5 13q0 2.925 2.038 4.963T12 20" /></svg> */}
                                </div>
                                <div class="projects__body">
                                    <h2 class="projects__title">Gestionar Centros</h2>
                                    {/* <p class="projects__description">Chart the course of events with this timeline creator, seamlessly plotting milestones and historical moments for a visually compelling narrative.</p> */}
                                </div>
                            </Link>
                            {/* <Link to="/pagina-admin-gestion-centro" class="projects__project">
                                <div class="projects__icon projects__icon--sixth">
                                    <FaSchool className='custom-icon' />
                                </div>
                                <div class="projects__body">
                                    <h2 class="projects__title">Editar Perfil</h2>
                                </div>
                            </Link> */}
                        </div>
                        {/* Coger de la pagina Admin el cerrar sesion y sustituirlo por lo de debajo */}
                        <div id='divisor'>
                            <hr />
                        </div>
                        <div className="projects__footer">
                            <Link to="/login" className='text-logout-footer' onClick={this.handleLogout}>
                                <FaSignOutAlt size={20} /> Cerrar Sesión
                            </Link>
                        </div>
                    </section>
                </main>
            </body>
        );
    }
};

export default AdminPanel;
