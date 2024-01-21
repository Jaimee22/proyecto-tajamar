import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/public/Home/Home';
import Login from './pages/public/Login/Login';
import Registro from './pages/public/Registro/Registro';
import CentroPublic from './pages/public/Centro/Centro';
import EmpresaPublic from './pages/public/Empresa/Empresa';
import TechRiderPublic from './pages/public/TechRider/TechRider';
import CentroPrivate from './pages/private/Centro/Centro';
import EmpresaPrivate from './pages/private/Empresa/Empresa';
import TechRiderPrivate from './pages/private/TechRider/TechRider';
import Navbar from './components/Navbar/Navbar';
import Admin from './pages/private/Admin/Admin';
import AdminCategorias from './pages/private/AdminCategorias/AdminCategorias';
import AdminGestionCentro from './pages/private/AdminGestionCentro/AdminGestionCentro';
import AdminGestionEmpresa from './pages/private/AdminGestionEmpresa/AdminGestionEmpresa';
import AdminGestionCharlas from './pages/private/AdminGestionCharlas/AdminGestionCharlas';
import AdminGestionUsuarios from './pages/private/AdminGestionUsuarios/AdminGestionUsuarios';
import AdminSolicitudes from './pages/private/AdminSolicitudes/AdminSolicitudes';


import Perfil from './pages/private/Perfil/Perfil';
import Charlas from './components/Charlas/Charlas';
import CharlasActivas from './pages/private/CharlasActivas/CharlasActivas';
import CharlasRealizadas from './pages/private/CharlasRealizadas/CharlasRealizadas';


import Pagina1 from './components/Pagina1';
import Pagina2 from './components/Pagina2';
import Testeo from './components/Testeo';

import Error404 from './components/Error404/Erorr404'

export default class Router extends Component {
  render() {
    return (
      
      <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/registro' element={<Registro/>}/>
            {/* <Route path='/centros' element={<CentroPublic/>}/>
            <Route path='/empresas' element={<EmpresaPublic/>}/>
            <Route path='/techriders' element={<TechRiderPublic/>}/> */}
            {/* <Route path='/centros-private' element={<CentroPrivate/>}/>
            <Route path='/empresas-private' element={<EmpresaPrivate/>}/>
            <Route path='/techriders-private' element={<TechRiderPrivate/>}/> */}
            <Route path='/pagina-admin' element={<Admin />}/>
            <Route path='/pagina-admin-categorias' element={<AdminCategorias />}/>
            <Route path='/pagina-admin-gestion-centro' element={<AdminGestionCentro />}/>
            <Route path='/pagina-admin-gestion-empresa' element={<AdminGestionEmpresa />}/>
            <Route path='/pagina-admin-gestion-charlas' element={<AdminGestionCharlas />}/>
            <Route path='/pagina-admin-gestion-usuarios' element={<AdminGestionUsuarios />}/>
            <Route path='/pagina-admin-solicitudes' element={<AdminSolicitudes />}/>
            <Route path='/pagina-profesor-responsable' element={<EmpresaPrivate/>}/>
            <Route path='/pagina-techriders' element={<TechRiderPrivate/>}/>
            <Route path='/perfil' element={<Perfil />}/>
            <Route path='/charlas' element={<Charlas />}/>
            <Route path='/charlas-solicitadas' element={<CharlasActivas />}/>
            <Route path='/charlas-realizadas' element={<CharlasRealizadas />}/>
            <Route path='/centros' element={<CentroPublic />}/>
            <Route path='/empresas' element={<EmpresaPublic />}/>


            <Route path='/pagina1' element={<Pagina1/>}/>
            <Route path='/pagina2' element={<Pagina2/>}/>
            <Route path='/testeo' element={<Testeo/>}/>
            <Route path='/*' element={<Error404/>}/>
            
        </Routes>
      </BrowserRouter>
      
    )
  }
}
