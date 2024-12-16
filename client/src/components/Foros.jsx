import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import LogoutButton from './LogoutButton';

const Foro = () => {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos de los foros desde la API
  const fetchForums = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        Swal.fire('Error', 'No estás autenticado. Por favor, inicia sesión.', 'error');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/foros', { // Cambia el puerto o URL si es necesario
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener los foros');
      }

      const data = await response.json();
      setForums(data);
    } catch (error) {
      Swal.fire('Error', error.message || 'No se pudieron cargar los foros.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForums();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6 flex flex-col space-y-6">
        <h2 className="text-3xl font-bold text-center">Aula Virtual</h2>
        <ul className="space-y-4 flex-1">
          <li>
            <Link to="/estudiante-perfil" className="hover:bg-blue-500 p-2 rounded">Mi Perfil</Link>
          </li>
          <li>
            <Link to="/estudiante-cursos" className="hover:bg-blue-500 p-2 rounded">Mis Cursos</Link>
          </li>
          <li>
            <Link to="/estudiante-tareas" className="hover:bg-blue-500 p-2 rounded">Tareas</Link>
          </li>
          <li>
            <Link to="/estudiante-foros" className="hover:bg-blue-500 p-2 rounded">Foros</Link>
          </li>
        </ul>
        {/* Botón de Cerrar Sesión */}
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="min-h-screen bg-gray-100 p-8 flex-1">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Foros de Discusión</h1>

        {loading ? (
          <p className="text-gray-600">Cargando foros...</p>
        ) : forums.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
  {forums.map((forum) => (
    <div key={forum.id} className="border-b pb-4">
      <h2 className="text-2xl font-semibold text-gray-800">{forum.title}</h2>
      <p className="text-gray-600">{forum.description}</p>
      
      {/* Enlace de Entrar al foro */}
      <Link to={`/foro/${forum.id}`} className="text-indigo-600 hover:text-indigo-800 inline-block mb-2">
        Entrar al foro
      </Link>

      {/* Input para Comentar */}
      <div className="mb-4">
        <label htmlFor={`comment-input-${forum.id}`} className="block text-gray-700 font-medium mb-2">
          Comentar:
        </label>
        <input
          type="text"
          id={`comment-input-${forum.id}`}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Escribe tu comentario..."
        />
      </div>
      
      {/* Botón para enviar comentario */}
      <div className="text-right">
        <button
          className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Enviar Comentario
        </button>
      </div>
    </div>
  ))}
</div>

        ) : (
          <p className="text-gray-600">No hay foros disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Foro;
