import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Mascotas from './pages/Mascotas';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Clientes from './pages/Clientes';
import Ventas from './pages/Ventas';
import ListadoVentas from './pages/ListadoVentas';  // Importar componente
import NuevaVenta from './pages/NuevaVenta';  // Importar componente
import VerVenta from './pages/VerVenta';

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setAccessToken(localStorage.getItem('access_token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <header className="App-header">
          {accessToken && <Navbar setAccessToken={setAccessToken} />}  {/* Pasar setAccessToken como prop */}
          <br></br>
          <br></br>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login setAccessToken={setAccessToken} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={accessToken ? <Home /> : <Navigate to="/login" />} />
            <Route path="/productos" element={accessToken ? <Productos /> : <Navigate to="/login" />} />
            <Route path="/mascotas" element={accessToken ? <Mascotas /> : <Navigate to="/login" />} />
            <Route path="/clientes" element={accessToken ? <Clientes /> : <Navigate to="/login" />} />
            <Route path="/ventas" element={accessToken ? <Ventas /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/ventas/listado" element={accessToken ? <ListadoVentas /> : <Navigate to="/login" />} />
            <Route path="/ventas/nueva" element={accessToken ? <NuevaVenta /> : <Navigate to="/login" />} />
            <Route path="/ventas/ver/:id" element={accessToken ? <VerVenta /> : <Navigate to="/login" />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
