import React from 'react';
import { useNavigate } from 'react-router-dom';  // Necesitamos useNavigate para redirigir

const Ventas = () => {
  const navigate = useNavigate();

  const handleListadoClick = () => {
    navigate('/ventas/listado'); // Redirige a la ruta de listado de ventas
  };

  const handleNuevaVentaClick = () => {
    navigate('/ventas/nueva'); // Redirige a la ruta de nueva venta
  };

  return (
    <div>
      <div className="container">
        <h1 className="text-center">Bienvenido al módulo de Ventas</h1>
        <div className="d-flex justify-content-center gap-4 mt-4">
          <button
            className="btn btn-primary"
            onClick={handleListadoClick}
            style={{ width: '200px' }}
          >
            Listado de Ventas
          </button>
          <button
            className="btn btn-success"
            onClick={handleNuevaVentaClick}
            style={{ width: '200px' }}
          >
            Nueva Venta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ventas;
