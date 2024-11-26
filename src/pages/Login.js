import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/img/logo-maskoteando.png'; // Asegúrate de la ruta correcta

function Login({ setAccessToken }) {  // Recibe setAccessToken como prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });

      // Verificar si se recibieron los tokens correctamente
      const { access, refresh } = response.data;

      if (access && refresh) {
        // Guardar los tokens en el localStorage
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('isAuthenticated', 'true');

        // Actualizar el estado de accessToken
        setAccessToken(access);

        // Redirigir a la página Home
        navigate('/home');
      } else {
        throw new Error('No se recibieron los tokens de autenticación');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.detail || 'Error al iniciar sesión');
      } else {
        setError('Credenciales inválidas, intenta de nuevo');
      }
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ backgroundColor: '#ffd1dc' }}>
      
      {/* Logo fuera del formulario */}
      <div className="text-center mb-4">
        <img src={logo} alt="Maskoteando Logo" style={{ width: '300px', borderRadius: '10px' }} />
      </div>

      {/* Formulario de inicio de sesión */}
      <form onSubmit={handleLogin} className="p-4 border rounded shadow" style={{ width: '300px', backgroundColor: '#fff' }}>
        <h3 className="mb-3 text-center">Iniciar Sesión</h3>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Usuario</label>
          <input 
            type="text" 
            className="form-control" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        {/* Botón Ingresar */}
        <button type="submit" className="btn w-100 mb-2" style={{ backgroundColor: '#ff8c00', color: '#fff' }}>Ingresar</button>

        {/* Botón Registrarse */}
        {/* <button type="button" className="btn w-100" style={{ backgroundColor: 'green', color: '#fff' }} onClick={() => navigate('/register')}>Registrarse</button> */}
      </form>
    </div>
  );
}

export default Login;
