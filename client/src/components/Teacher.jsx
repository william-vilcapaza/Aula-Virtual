import { useState, useEffect } from "react";
import { Link } from "react-router-dom";  
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import LogoutButton from "./LogoutButton";

const Estudent = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token'); // Asegúrate de guardar el token en localStorage al iniciar sesión
        const response = await fetch('http://localhost:5000/api/cursosestudiante', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            Swal.fire('Error', 'Sesión expirada. Por favor, inicia sesión nuevamente.', 'error');
            navigate('/login'); // Redirige al login si no está autenticado
          } else {
            throw new Error('Error al obtener los cursos');
          }
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudo cargar los cursos.', 'error');
      }
    };

    fetchCourses();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6 flex flex-col space-y-6">
        <h2 className="text-3xl font-bold text-center">Aula Virtual</h2>
        <ul className="space-y-4 flex-1">
          <li>
            <Link to="/profesor-perfil" className="hover:bg-blue-500 p-2 rounded">Mi Perfil</Link>
          </li>
          <li>
            <Link to="/profesor-cursos" className="hover:bg-blue-500 p-2 rounded">Mis Cursos</Link>
          </li>
          <li>
            <Link to="/profesor-tareas" className="hover:bg-blue-500 p-2 rounded">Tareas</Link>
          </li>
          <li>
            <Link to="/profesor-foros" className="hover:bg-blue-500 p-2 rounded">Foros</Link>
          </li>
        </ul>
        {/* Botón de Cerrar Sesión */}
        <div className="mt-auto"> {/* mt-auto empuja el contenido hacia abajo */}
          <LogoutButton />
        </div>
      </div>
  
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        {/* Título Principal */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Aula Virtual</h1>
        
        {/* Subtítulo motivacional */}
        <p className="text-xl text-gray-600 mb-6 text-center">¡Aprende a tu propio ritmo y da lo mejor de ti!</p>
  
        {/* Sección de íconos con textos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center w-full">
          
          {/* Colegio Icon */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center w-64">
            <i className="fas fa-school text-4xl text-indigo-600 mb-4"></i>
            <p className="font-semibold text-gray-800">Colegio: Maria Auxiliadora</p>
          </div>
          
          {/* Horario Icon */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center w-64">
            <i className="fas fa-clock text-4xl text-indigo-600 mb-4"></i>
            <p className="font-semibold text-gray-800">Horario: 7:45 - 12:45</p>
          </div>
          
          {/* Modalidad Icon */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center w-64">
            <i className="fas fa-briefcase text-4xl text-indigo-600 mb-4"></i>
            <p className="font-semibold text-gray-800">Modalidad: Regular</p>
          </div>
          
          {/* Turno Icon */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center w-64">
            <i className="fas fa-sun text-4xl text-indigo-600 mb-4"></i>
            <p className="font-semibold text-gray-800">Turno: Mañana</p>
          </div>
        </div>
  
        {/* Enlace de contacto */}
        <div className="mt-6 text-center">
          <Link to="https://www.facebook.com/IEEMariaAuxiliadora" className="text-indigo-600 hover:text-indigo-800">
            Contáctanos para más información
          </Link>
        </div>
      </div>
    </div>
  );
  
};

export default Estudent;
