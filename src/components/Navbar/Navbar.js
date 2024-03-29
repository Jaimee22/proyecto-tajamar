// import React, { useState, useEffect } from 'react';
// import { NavLink, useNavigate, useLocation } from 'react-router-dom';
// import LogoTechRidersNavbar from '../../assets/img/logo-navbar-techriders.png';
// import { FaUserCircle } from 'react-icons/fa';
// import { DiAptana } from 'react-icons/di';
// import Swal from 'sweetalert2';
// import './Navbar.css';
// import { CiLogout } from 'react-icons/ci';


// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);

//     Swal.fire({
//       icon: 'success',
//       title: 'Sesión cerrada',
//       text: 'Se ha cerrado la sesión de forma exitosa.',
//     }).then(() => {
//       navigate('/');
//     });
//   };

//   const handleLogin = () => {
//     // Lógica de inicio de sesión aquí
//     // Si el inicio de sesión es exitoso, entonces establece isLoggedIn en true
//     // Ejemplo:
//     // loginUser().then(() => {
//     //   setIsLoggedIn(true);
//     // });

//     // Por ahora, simplemente estableceremos isLoggedIn en true para simular un inicio de sesión exitoso
//     setIsLoggedIn(true);
//   };

//   useEffect(() => {
//     setIsLoggedIn(!!localStorage.getItem('token'));
//   }, []);

//   return (
//     <nav className="navbar navbar-expand-lg bg-dark sticky-top" data-bs-theme="dark">
//       <div className="container">
//         <a className="navbar-brand" href="/">
//           <img src={LogoTechRidersNavbar} alt="Logo" style={{ height: '5rem', paddingTop: '1rem' }} />
//         </a>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item">
//               <NavLink className="nav-link" aria-current="page" to="/">
//                 Inicio
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/centros">
//                 Centros
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/empresas">
//                 Empresas
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/techriders">
//                 TechRiders
//               </NavLink>
//             </li>
//           </ul>
//           <ul className="navbar-nav ms-auto">
//             {location.pathname === '/login' && (
//               <li className="nav-item iconos-nav">
//                 <NavLink className="nav-link" to="/login" onClick={handleLogin}>
//                   <FaUserCircle size={35} />
//                 </NavLink>
//               </li>
//             )}
//             {isLoggedIn && location.pathname !== '/login' && (
//               <>
//                 <li className="nav-item iconos-nav">
//                   <NavLink className="nav-link" to="/pagina-techriders">
//                     <DiAptana size={35} /> Perfil
//                   </NavLink>
//                 </li>
//                 <li className="nav-item iconos-nav">
//                   <NavLink className="nav-link" to="#" onClick={handleLogout}>
//                     <CiLogout size={35} /> Cerrar Sesión
//                   </NavLink>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoTechRidersNavbar from '../../assets/img/logo-navbar-techriders.png';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdSettings } from "react-icons/io";
import { TbLogout2 } from 'react-icons/tb';
import Swal from 'sweetalert2';
import './Navbar.css';

const Navbar = () => {
  
  // Obtiene el token del localStorage
  const token = localStorage.getItem('token'); 

  const handleLogout = () => {
    
    // Token antes de cerrar sesión 
    console.log('Token antes de cerrar sesión:', token);
  
    // Elimina el token del localStorage
    localStorage.removeItem('token');
    
    // token después de cerrar sesión (debería estar borrado)
    console.log('Se ha cerrado la sesión. Token después de cerrar sesión:', localStorage.getItem('token'));

    // Muestra el mensaje de cierre de sesión exitoso con SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Se ha cerrado la sesión de forma exitosa.',
    }).then(() => {
      // Recarga la página y redirige a la página de inicio
      window.location.reload();
      window.location.href = '/';
    });
  }
  
  

  return (
    <nav className="navbar navbar-expand-lg bg-dark sticky-top" data-bs-theme="dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={LogoTechRidersNavbar} alt="Logo" style={{ height: '5rem', paddingTop: '1rem' }} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/centros">
                Centros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/empresas">
                Empresas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/techriders">
                TechRiders
              </NavLink>
            </li>
            {/* <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Privado
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/centros-private">
                    Centros
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/empresas-private">
                    Empresas
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/techriders-private">
                    TechRiders
                  </NavLink>
                </li>
              </ul>
            </li> */}
          </ul>
            <ul className="navbar-nav ms-auto">

            <li className="nav-item iconos-nav">
              <NavLink className="nav-link" to="/login">
                <FaUserCircle size={35}/>
              </NavLink>
            </li>
            {/* {token && (
              <li className="nav-item iconos-nav">
                <NavLink className="nav-link" onClick={handleLogout}>
                  <TbLogout2 size={35}/> Cerrar Sesión
                </NavLink>
              </li>
            )} */}
            </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
