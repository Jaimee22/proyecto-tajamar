import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { RiSpeakLine } from "react-icons/ri";
import { FaSignOutAlt } from 'react-icons/fa';
import { FaUserEdit } from "react-icons/fa";
import { BsArchive } from "react-icons/bs";


const StandardSidebar = () => {
    
    const cerrarSesion = () => {
        // Elimina el token del localStorage
        localStorage.removeItem('token');
    
        // Redirige a la página de inicio
        window.location.href = '/';
      };

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '280px' }}>
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <GoHome size={24} />
                <span className="fs-4 ms-2">TechRider</span>
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {/* <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            <svg className="bi me-2" width="18" height="18">
              <use xlinkHref="#home" />
            </svg>
            Home
          </a>
        </li> */}
                <li className="nav-item">
                    <Link to="#" className="nav-link active" aria-current="page">
                        <GoHome size={18} />
                        <span className="ms-2">Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="#" className="nav-link link-dark">
                        <FaUserEdit size={18} />
                        <span className="ms-2">Editar Perfil</span>
                    </Link>
                </li>
                <li>
                    <Link to="#" className="nav-link link-dark">
                        <RiSpeakLine size={18} />
                        <span className="ms-2">Charlas ¿Activas?</span>
                    </Link>
                </li>
                <li>
                    <Link to="#" className="nav-link link-dark">
                        <BsArchive size={18} />
                        <span className="ms-2">Charlas Realizadas</span>
                    </Link>
                </li>
            </ul>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li>
                    <Link to="#" className="d-flex align-items-center nav-link link-dark" onClick={cerrarSesion} >
                        <FaSignOutAlt size={18} />
                        <span className="ms-2">Cerrar Sesión</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

const ResponsiveSidebar = () => {

    const cerrarSesion = () => {
        // Elimina el token del localStorage
        localStorage.removeItem('token');
    
        // Redirige a la página de inicio
        window.location.href = '/';
      };

    return (
        <div className="d-flex flex-column flex-shrink-0 bg-light" style={{ width: '4.5rem' }}>
            <Link to="/" className="d-block p-3 link-dark text-decoration-none" title="Icon-only" data-bs-toggle="tooltip" data-bs-placement="right">
                <GoHome size={24} />
                <span className="visually-hidden">TechRider</span>
            </Link>
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                <li className="nav-item">
                    <Link to="#" className="nav-link active py-3 border-bottom" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="right">
                        <GoHome size={22} />
                    </Link>
                </li>
                <li>
                    <Link to="#" className="nav-link py-3 border-bottom" data-bs-toggle="tooltip" data-bs-placement="right">
                        <RiSpeakLine size={22} />
                    </Link>
                </li>
                <li>
                    <Link to="#" className="nav-link py-3 border-bottom" data-bs-toggle="tooltip" data-bs-placement="right">
                        <RiSpeakLine size={22} />
                    </Link>
                </li>
                <li>
                    <Link to="#" className="nav-link py-3 border-bottom" data-bs-toggle="tooltip" data-bs-placement="right">
                        <RiSpeakLine size={22} />
                    </Link>
                </li>
            </ul>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li>
                    <Link to="#" className="d-flex align-items-center nav-link link-dark" onClick={cerrarSesion} >
                        <FaSignOutAlt size={22} />
                    </Link>
                </li>
            </ul>
        </div>
    );
};


const Sidebar = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const breakpoint = 768;

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    return <div>{windowWidth >= breakpoint ? <StandardSidebar /> : <ResponsiveSidebar />}</div>;
};

export default Sidebar;
