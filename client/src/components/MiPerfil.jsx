import React from 'react';
import { Link } from "react-router-dom";  // Importamos Link para la navegación
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const MiPerfil = () => {
  // Aquí podrías obtener los datos del perfil del estudiante desde un estado o API
  const user = JSON.parse(localStorage.getItem('user')) || {};  // Obtenemos los datos del usuario desde localStorage

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6 flex flex-col space-y-6">
        <h2 className="text-3xl font-bold text-center">Aula Virtual</h2>
        <ul className="space-y-4 flex-1"> {/* Usamos flex-1 para que ocupe todo el espacio disponible */}
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
        <div className="mt-auto"> {/* mt-auto empuja el contenido hacia abajo */}
          <LogoutButton />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Mi Perfil</h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/150"  // Aquí deberías usar la foto del usuario
              alt="Perfil"
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user.nombre || 'Nombre del estudiante'}</h2>
              <p className="text-gray-600">{user.email || 'correo@example.com'}</p>
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;
