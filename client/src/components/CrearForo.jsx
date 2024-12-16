import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LogoutButton from "./LogoutButton";

const CrearForo = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [materias, setMaterias] = useState([]);
  const [materiaId, setMateriaId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/cursos', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            Swal.fire('Error', 'Sesión expirada. Por favor, inicia sesión nuevamente.', 'error');
            navigate('/login');
          } else {
            throw new Error('Error al obtener las materias');
          }
        }

        const data = await response.json();
        setMaterias(data);
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudieron cargar las materias.', 'error');
      }
    };

    fetchMaterias();
  }, [navigate]);

  const handleCreateForo = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/foros', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo,
        descripcion,
        materia_id: materiaId, // El ID de la materia seleccionada
      }),
    });

    if (response.ok) {
      Swal.fire('Éxito', 'Foro creado correctamente', 'success');
      setTitulo('');
      setDescripcion('');
      setMateriaId('');
    } else {
      Swal.fire('Error', 'No se pudo crear el foro', 'error');
    }
  };

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
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Crear Foro</h1>

        {/* Formulario para crear un nuevo foro */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Título del Foro</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Título del foro"
              />
            </div>

            <div>
              <label className="block text-gray-700">Descripción del Foro</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Descripción del foro"
              />
            </div>

            <div>
              <label className="block text-gray-700">Seleccionar Curso</label>
              <select
                value={materiaId}
                onChange={(e) => setMateriaId(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Seleccione un curso</option>
                {materias.map((materia) => (
                  <option key={materia.id} value={materia.id}>
                    {materia.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="button"
                onClick={handleCreateForo}
                className="w-full py-2 bg-blue-600 text-white rounded"
              >
                Crear Foro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearForo;
