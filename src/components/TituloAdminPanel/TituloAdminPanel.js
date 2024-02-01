import React from 'react';
import BotonVolver from '../BotonVolver/BotonVolver';
import './TituloAdminPanel.css'; // Estilos del componente

const TituloAdminPanel = ({ texto, color }) => {
  const estiloComponente = {
    backgroundColor: color,
  };

  return (
    <div className="titulo-admin-panel" style={estiloComponente}>
      <BotonVolver />
      <h1 className='titulo-texto'>{texto}</h1>
      <div></div>
    </div>
  );
};

export default TituloAdminPanel;
