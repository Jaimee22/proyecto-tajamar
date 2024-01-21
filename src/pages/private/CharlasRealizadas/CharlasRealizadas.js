import React, { Component } from 'react'
import CharlasRealizadasComponent from '../../../components/CharlasRealizadasComponent/CharlasRealizadasComponent'
import Sidebar from '../../../components/Sidebar/Sidebar'

export default class CharlasRealizadas extends Component {
  render() {
    return (
        <>
        <div className='d-flex'>
          <Sidebar/>
          <div className='charlas-realizadas-container'>
            <CharlasRealizadasComponent/>
          </div>
        </div>
      </>
    )
  }
}
