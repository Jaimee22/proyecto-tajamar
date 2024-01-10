import React from "react";
import "./Error404.css";
import { BiSolidError } from "react-icons/bi";

const Error404 = () => {
  return (
    <div className="error404-container">
      <h1>
        <BiSolidError size={90} color='#EFA94A'/>
      </h1>
      <h1 className="error-title">Error 404</h1>
      <p className="error-message">Oops! Página no encontrada.</p>
    </div>
  );
};

export default Error404;
