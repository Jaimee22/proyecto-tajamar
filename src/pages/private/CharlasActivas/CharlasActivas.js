import React, { Component } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import CharlasActivasComponent from '../../../components/CharlasActivasComponent/CharlasActivas'

export default class CharlasActivas extends Component {
  render() {
    return (
      <>
        <div className='d-flex'>
          <Sidebar/>
          <div className='charlas-activas-container'>
            <CharlasActivasComponent/>
          </div>
        </div>
      </>
    )
  }
}
