import React from 'react';
import "./BotonVolver.css"
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const BotonVolver = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Aquí puedes agregar lógica adicional para manejar el evento de clic
    // Por ahora, solo imprime un mensaje en la consola
    console.log('Back to top button clicked');
    
    // Utiliza navigate para redirigir a la ruta '/pagina-admin'
    navigate('/pagina-admin');
  };

  return (
    <button className="button" onClick={handleClick}>
      <IoMdArrowRoundBack className='svgIcon'/>
    </button>
  );
};

export default BotonVolver;

