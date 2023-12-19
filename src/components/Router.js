import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pagina1 from './Pagina1';
import Inicio from './Inicio';

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
