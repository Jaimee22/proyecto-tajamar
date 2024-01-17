import React, { Component } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import PerfilComponent from '../../../components/PerfilComponent/Perfil';

export default class Perfil extends Component {
  render() {
    return (
      <>
        <div className='d-flex'>
          <Sidebar/>
          <div className='p-5'>
            <PerfilComponent/>
          </div>
        </div>
      </>
    )
  }
}
