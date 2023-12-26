import React, { Component } from 'react'
import InicioHome from '../../../components/InicioHome/InicioHome'
import './Home.css'

export default class Home extends Component {
  render() {
    return (
      <div className='container-home'>
        <InicioHome/>
      </div>
    )
  }
}
