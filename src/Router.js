import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pagina1 from './components/Pagina1';
import Inicio from './components/Inicio';

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Inicio/>}/>
            <Route path='/pagina1' element={<Pagina1/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}
