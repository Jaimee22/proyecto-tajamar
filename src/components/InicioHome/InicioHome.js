import React, { Component } from 'react'
import Charlas from '../Charlas/Charlas';
import './InicioHome.css';

export default class InicioHome extends Component {
  render() {
    return (
        <>
            <div className='inicio-home-container'>
                <div className='inicio-home-info'>
                    <h1 id='title-home'>SOMOS TECH RIDERS</h1>
                    <h3 id='text-home'>
                        Pilotas tu propia carrera profesional tecnológica. Te formas
                        y colaboras con otras personas.<br/> Trabajas en equipo. La tecnología
                        no para; está siempre en marcha. Siempre te<br/> estás actualizando,
                        actualizando. Eres un/a Tech Rider.
                    </h3>
                    <div className='inicio-home-skills'>
                        <p>Orientación y formación en tecnología</p>
                        <p>Charlas técnicas, motivacionales o softskills para estudiantes de tecnología</p>
                        <p>Tutoriales sobre tecnología</p>
                    </div>
                </div>
            </div>
            <div className='container'>
                <Charlas />
            </div>
        </>
    )
  }
}
