import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VerVenta = ({ match }) => {
  const [venta, setVenta] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    axios.get(`http://localhost:8000/api/ventas/${match.params.id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,  // Incluir el token en el encabezado
        },
    })
    .then(response => {
        setVenta(response.data);
        console.log('response.data', response.data);
    })
    .catch(error => console.error(error));
    
  }, [match.params.id]);

  if (!venta) return <div>Cargando...</div>;

  return (
    <div>
      <h1 className="text-center">Ver Venta {venta.id}</h1>
      <div>
        <h3>Cliente:</h3>
        <p>{venta.cliente.nombre}</p>

        <h3>Productos:</h3>
        <ul>
          {venta.productos.map(producto => (
            <li key={producto.id}>{producto.nombre}</li>
          ))}
        </ul>

        <h3>Mas mascotas:</h3>
        <ul>
          {venta.mascotas.map(mascota => (
            <li key={mascota.id}>{mascota.nombre}</li>
          ))}
        </ul>

        <h3>Total:</h3>
        <p>${venta.total}</p>
      </div>
    </div>
  );
};

export default VerVenta;
