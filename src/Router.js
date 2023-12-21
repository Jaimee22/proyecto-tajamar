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
import Pagina1 from './components/Pagina1';

export default class Router extends Component {
  render() {
    return (
      
      <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/registro' element={<Registro/>}/>
            <Route path='/centros' element={<CentroPublic/>}/>
            <Route path='/empresas' element={<EmpresaPublic/>}/>
            <Route path='/techriders' element={<TechRiderPublic/>}/>
            <Route path='/centros-private' element={<CentroPrivate/>}/>
            <Route path='/empresas-private' element={<EmpresaPrivate/>}/>
            <Route path='/techriders-private' element={<TechRiderPrivate/>}/>

            <Route path='/pagina1' element={<Pagina1/>}/>
        </Routes>
      </BrowserRouter>
      
    )
  }
}
