import React, { useState }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Navbar.css';
import logo from '../assets/img/logo-maskoteando.png'; // Asegúrate de la ruta correcta

const Navbar = ({ setAccessToken }) => {
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout = () => {
    // Eliminar los tokens y estado de autenticación del localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('isAuthenticated');

    // Actualizar el estado de accessToken a null para que el Navbar desaparezca
    setAccessToken(null);

    // Redirigir al login
    navigate('/login');
  };

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLinkClick = () => {
    setIsCollapsed(true); // Cerrar el colapso después de hacer clic en un enlace
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">

        {/* Logo en el navbar */}
        <Link className="navbar-brand logo-container" to="/home">
          <img 
            src={logo} 
            alt="Maskoteando Logo" 
            className="navbar-logo" 
          />
        </Link>

                {/* Botón de colapso para pantallas pequeñas */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/productos" onClick={handleLinkClick}>Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mascotas" onClick={handleLinkClick}>Mascotas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/clientes" onClick={handleLinkClick}>Clientes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/consultas" onClick={handleLinkClick}>Consultas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ventas" onClick={handleLinkClick}>Ventas</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/usuarios" onClick={handleLinkClick}>Usuarios</Link>
            </li> */}

          </ul>
        </div>
        
       {/* Botón Configuraciones */}
       <Link 
          className="btn btn-paw ms-2"
          to="/configuraciones"
          title="Configuraciones"
        >
          <i className="fas fa-paw"></i>
        </Link>

        {/* Botón Salir */}
        <button 
          className="btn btn-danger ms-3"
          onClick={handleLogout}
          title="Salir"
        >
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
