import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Pagina1 extends Component {
  render() {
    return (
        <div>
            <h1>Pagina1</h1>
            <NavLink to="/">Hola</NavLink>
            {/* <a href='/'>Inicio</a> */}
        </div>
    )
  }
}
