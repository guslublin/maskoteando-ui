import React from 'react';
import { useNavigate } from 'react-router-dom';

const Usuarios = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4 text-center">
      <h1 className="mt-4">Bienvenido al módulo de Usuarios</h1>
      <button
        className="btn btn-success mt-4"
        onClick={() => {}}
      >
        Listado
      </button>
      <br></br>
      <button
        className="btn btn-primary mt-4"
        onClick={() => navigate('/register')}
      >
        Nuevo
      </button>
    </div>
  );
};

export default Usuarios;
