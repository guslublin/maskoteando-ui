import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Consultas = () => {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [showListadoModal, setShowListadoModal] = useState(false);
  const [showNuevaConsultaModal, setShowNuevaConsultaModal] = useState(false);
  const [nuevaConsulta, setNuevaConsulta] = useState({
    fecha_consulta: '',
    hora: '',
    motivo: '',
    observacion: '',
    mascota: '',
    cliente: ''
  });

  useEffect(() => {
    fetchConsultas();
    fetchClientes();
    fetchMascotas();
  }, []);

  // Obtener consultas
  const fetchConsultas = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:8000/api/consultas/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setConsultas(response.data);
    } catch (error) {
      console.error("Error al obtener las consultas:", error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  // Obtener clientes
  const fetchClientes = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:8000/api/clientes/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setClientes(response.data);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  // Obtener mascotas
  const fetchMascotas = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:8000/api/mascotas/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMascotas(response.data);
    } catch (error) {
      console.error("Error al obtener las mascotas:", error);
    }
  };

  const handleNuevaConsultaChange = (e) => {
    setNuevaConsulta({ ...nuevaConsulta, [e.target.name]: e.target.value });
  };

  // Guardar nueva consulta y mostrar notificación
  const handleGuardarConsulta = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(
        'http://localhost:8000/api/consultas/',
        nuevaConsulta,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      fetchConsultas();
      setShowNuevaConsultaModal(false);
      toast.success('Consulta guardada exitosamente!');
    } catch (error) {
      console.error("Error al guardar la consulta:", error);
      toast.error('Error al guardar la consulta');
    }
  };

  const handleExportarExcel = async () => {
    try {
      const token = localStorage.getItem('access_token'); // Obtener el token de localStorage
      const response = await axios.get('http://localhost:8000/api/consultas/exportar-excel/', {
        headers: {
          'Authorization': `Bearer ${token}` // Agregar el token en las cabeceras
        },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'consultas.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error al exportar las consultas:", error);
      if (error.response && error.response.status === 401) {
        toast.error('No autorizado. Inicia sesión nuevamente.');
        navigate('/login'); // Redirigir al login si el token es inválido o expiró
      }
    }
  };
  

  return (
    <div className="d-flex flex-column align-items-center vh-100 mt-4">
      <h1 className="text-center mb-4 mt-4">Consultas</h1>
      <Button variant="success" onClick={() => setShowListadoModal(true)} className="mb-3">Listado de Consultas</Button>
      <Button variant="primary" onClick={() => setShowNuevaConsultaModal(true)}>Nueva Consulta</Button>

      {/* Modal Listado de Consultas */}
      <Modal show={showListadoModal} onHide={() => setShowListadoModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Listado de Consultas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Mascota</th>
                <th>Cliente</th>
                <th>Motivo</th>
                <th>Observación</th>
              </tr>
            </thead>
            <tbody>
              {consultas.map((consulta) => (
                <tr key={consulta.id}>
                  <td>{consulta.id}</td>
                  <td>{consulta.fecha_consulta}</td>
                  <td>{consulta.hora}</td>
                  <td>{consulta.mascota_nombre}</td> {/* Mostrar nombre de la mascota */}
                  <td>{consulta.cliente_nombre}</td> {/* Mostrar nombre del cliente */}
                  <td>{consulta.motivo}</td>
                  <td>{consulta.observacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowListadoModal(false)}>Cerrar</Button>
          <Button variant="success" onClick={handleExportarExcel}>Descargar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Nueva Consulta */}
      <Modal show={showNuevaConsultaModal} onHide={() => setShowNuevaConsultaModal(false)} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Nueva Consulta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Consulta</Form.Label>
              <Form.Control type="date" name="fecha_consulta" value={nuevaConsulta.fecha_consulta} onChange={handleNuevaConsultaChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hora</Form.Label>
              <Form.Control type="time" name="hora" value={nuevaConsulta.hora} onChange={handleNuevaConsultaChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mascota</Form.Label>
              <Form.Select name="mascota" value={nuevaConsulta.mascota} onChange={handleNuevaConsultaChange}>
                <option value="">Seleccione una mascota</option>
                {mascotas.map((mascota) => (
                  <option key={mascota.id} value={mascota.id}>
                    {mascota.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Select name="cliente" value={nuevaConsulta.cliente} onChange={handleNuevaConsultaChange}>
                <option value="">Seleccione un cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Motivo</Form.Label>
              <Form.Control type="text" name="motivo" value={nuevaConsulta.motivo} onChange={handleNuevaConsultaChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Observación</Form.Label>
              <Form.Control as="textarea" name="observacion" value={nuevaConsulta.observacion} onChange={handleNuevaConsultaChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNuevaConsultaModal(false)}>Volver</Button>
          <Button variant="primary" onClick={handleGuardarConsulta}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Consultas;
