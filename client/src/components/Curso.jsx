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
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Curso de {course.title}</h1>
        
        {/* Detalle del curso */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <p className="text-gray-600 mt-2 text-2xl">{course.descripcion}</p>


      

          {/* Información adicional sobre el curso */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Contenido del curso</h3>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Fundamentos teóricos y prácticos.</li>
          <li>Estudio de casos y ejemplos reales.</li>
          <li>Exploración de herramientas y recursos adicionales.</li>
          <li>Proyectos prácticos para aplicar lo aprendido.</li>
        </ul>
      </div>

      {/* Fechas importantes */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Fechas importantes</h3>
        <p className="text-gray-600">Fecha de inicio: 1 de Enero de 2024</p>
        <p className="text-gray-600">Fecha de finalización: 31 de Diciembre de 2024</p>
      </div>

      {/* Requisitos del curso */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Requisitos</h3>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Conocimientos básicos previos en la materia.</li>
          <li>Acceso a internet para ver los materiales del curso.</li>
          <li>Ganas de aprender y participar activamente en el curso.</li>
        </ul>
      </div>

      {/* Evaluación */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Evaluación</h3>
        <p className="text-gray-600">El curso incluye ejercicios prácticos, pruebas periódicas y una evaluación final para medir tu progreso.</p>
      </div>

      {/* Material adicional */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Materiales adicionales</h3>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Lecturas recomendadas.</li>
          <li>Videos explicativos.</li>
          <li>Foros y discusiones grupales.</li>
        </ul>
      </div>

          <Link to="/estudiante-cursos" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
            Volver a Mis Cursos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CursoTeacher;
