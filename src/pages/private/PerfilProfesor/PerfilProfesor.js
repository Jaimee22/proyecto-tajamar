import React, { Component } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import PerfilComponent from '../../../components/PerfilComponent/Perfil';
import './PerfilProfesor.css'

export default class PerfilProfesor extends Component {
  render() {
    return (
      <>
        <div className='d-flex'>
          <Sidebar/>
          <div className='perfil-container'>
            <PerfilComponent/>
          </div>
        </div>
      </>
    )
  }
}
