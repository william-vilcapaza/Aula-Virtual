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

      {/* Main content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Bienvenido, Estudiante</h1>
        
        {/* Courses Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold text-gray-800">{course.title}</h2>
              <p className="text-gray-600 mt-2">{course.descripcion}</p>
              <Link to={`/curso/${course.id}`} className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
                Ver Curso
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Estudent;
