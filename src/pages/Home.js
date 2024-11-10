import React from 'react';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import logo from '../assets/img/logo-maskoteando.png'; // Asegúrate de que la ruta del logo sea correcta


const Home = () => {

  const navigate = useNavigate();

  const ir_modulo_productos = () => {
    navigate('/productos');
  };

  const ir_modulo_mascotas = () => {
    navigate('/mascotas');
  };

  const ir_modulo_clientes = () => {
    navigate('/clientes');
  };

  const notify = () => {
    toast.success('¡Has hecho clic en el botón!', {
      position: "top-right",  // Usa una cadena en lugar de una constante
      autoClose: 5000,  // La notificación se cierra automáticamente después de 3 segundos
    });
  }

  return (
    <div className="d-flex flex-column align-items-center vh-100 mt-4">
      <h1 className="text-center mb-4 mt-4">Bienvenido al sistema</h1>
      <div className='mt-4'><img src={logo} alt="Maskoteando Logo" style={{ width: '350px', borderRadius: '10px' }} /></div>
    </div>
  );
};

export default Home;
