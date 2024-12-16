import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import LogoutButton from "./LogoutButton";

const CursoTeacher = () => {
  const [course, setCourse] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const { id } = useParams();  // Obtiene el ID del curso de la URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/cursosestudiante/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            Swal.fire('Error', 'Sesión expirada. Por favor, inicia sesión nuevamente.', 'error');
            navigate('/login');
          } else {
            throw new Error('Error al obtener el curso');
          }
        }

        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudo cargar el curso.', 'error');
      }
    };

    fetchCourse();
  }, [id, navigate]);

  const handleCreateTask = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/tareas`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo,
        descripcion,
        fecha_entrega: fechaEntrega,
        curso_id: id, // El ID del curso lo obtienes de la URL
      }),
    });

    if (response.ok) {
      Swal.fire('Éxito', 'Tarea creada correctamente', 'success');
      // Resetea los campos
      setTitulo('');
      setDescripcion('');
      setFechaEntrega('');
    } else {
      Swal.fire('Error', 'No se pudo crear la tarea', 'error');
    }
  };

  if (!course) {
    return <div>Cargando curso...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
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
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Curso de {course.title}</h1>
        
        {/* Detalle del curso */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mt-4">{course.descripcion}</p>

          <h3 className="text-2xl mt-6 mb-4">Crear una nueva tarea</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Título</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Título de la tarea"
              />
            </div>

            <div>
              <label className="block text-gray-700">Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Descripción de la tarea"
              />
            </div>

            <div>
              <label className="block text-gray-700">Fecha de entrega</label>
              <input
                type="datetime-local"
                value={fechaEntrega}
                onChange={(e) => setFechaEntrega(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <button
                type="button"
                onClick={handleCreateTask}
                className="w-full py-2 bg-blue-600 text-white rounded"
              >
                Crear Tarea
              </button>
            </div>
          </form>

          <Link to="/profesor-cursos" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
            Volver a Mis Cursos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CursoTeacher;
