import React, { Component } from 'react'
import NuevaCharlaComponent from '../../../components/NuevaCharlaComponent/NuevaCharlaComponent'
import Sidebar from '../../../components/Sidebar/Sidebar'

export default class NuevaCharla extends Component {
  render() {
    return (
        <>
        <div className='d-flex'>
          <Sidebar/>
          <div className='charlas-realizadas-container'>
            <NuevaCharlaComponent/>
          </div>
        </div>
      </>
    )
  }
}
