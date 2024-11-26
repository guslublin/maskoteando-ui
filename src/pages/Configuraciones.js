import React from 'react';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Configuraciones = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="container mt-4 text-center">
        <h1 className="mt-4">Bienvenido al módulo de Configuraciones</h1>
        <button
          className="btn btn-success mt-4"
          onClick={() => navigate('/usuarios')}
        >
          Usuarios
        </button>
      </div>
    </div>
  );
};

export default Configuraciones;
