import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NuevaVenta = () => {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [productoIds, setProductoIds] = useState([]);
  const [mascotaIds, setMascotaIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener clientes, productos y mascotas desde la API
    const token = localStorage.getItem('access_token');

    axios.get('http://localhost:8000/api/clientes/', {
      headers: {
        Authorization: `Bearer ${token}`,  // Incluir el token en el encabezado
      },
    })
      .then(response => {
        setClientes(response.data);
        console.log('response.data', response.data);
      })
      .catch(error => console.error(error));


    axios.get('http://localhost:8000/api/productos/', {
      headers: {
        Authorization: `Bearer ${token}`,  // Incluir el token en el encabezado
      },
    })
      .then(response => {
        setProductos(response.data);
        console.log('response.data', response.data);
      })
      .catch(error => console.error(error));


    axios.get('http://localhost:8000/api/mascotas/', {
      headers: {
        Authorization: `Bearer ${token}`,  // Incluir el token en el encabezado
      },
    })
      .then(response => {
        setMascotas(response.data);
        console.log('response.data', response.data);
      })
      .catch(error => console.error(error));

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      cliente: clienteId,
      productos: productoIds,
      mascotas: mascotaIds,
    };

    try {
      const token = localStorage.getItem('access_token');

      axios.post('http://localhost:8000/api/ventas/crear/', data, {
        headers: {
          Authorization: `Bearer ${token}`,  // Incluir el token en el encabezado
        },
      })
        .catch(error => {
          console.error("Error al agregar la mascota:", error.response.data);
        });


      navigate('/ventas/listado');  // Redirige al listado de ventas
    } catch (error) {
      console.error('Error al crear la venta:', error);
    }
  };

  return (
    <div>
      <h1 className="text-center">Nueva Venta</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cliente:</label>
          <select value={clienteId} onChange={(e) => setClienteId(e.target.value)}>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Productos:</label>
          <select multiple value={productoIds} onChange={(e) => setProductoIds([...e.target.selectedOptions].map(option => option.value))}>
            {productos.map(producto => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre} - ${producto.precio_venta}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Mas mascotas:</label>
          <select multiple value={mascotaIds} onChange={(e) => setMascotaIds([...e.target.selectedOptions].map(option => option.value))}>
            {mascotas.map(mascota => (
              <option key={mascota.id} value={mascota.id}>
                {mascota.nombre}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Crear Venta</button>
      </form>
    </div>
  );
};

export default NuevaVenta;
