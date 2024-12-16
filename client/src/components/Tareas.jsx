import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LogoutButton from "./LogoutButton";

const Tareas = () => {
  const [tasks, setTasks] = useState([]); // Estado para las tareas
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  // Función para cargar las tareas de todos los cursos (del 1 al 20)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const cursoIds = Array.from({ length: 20 }, (_, i) => i + 1); // Array de cursoId [1, 2, ..., 20]
        
        // Usar Promise.all para hacer todas las solicitudes al mismo tiempo
        const responses = await Promise.all(
          cursoIds.map(cursoId =>
            fetch(`http://localhost:5000/api/tareas/${cursoId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );
        
        // Comprobar si alguna de las respuestas es incorrecta
        for (let response of responses) {
          if (!response.ok) {
            if (response.status === 401) {
              Swal.fire("Error", "Sesión expirada. Por favor, inicia sesión nuevamente.", "error");
              navigate("/login");
              return;
            } else {
              throw new Error("Error al obtener las tareas");
            }
          }
        }

        // Extraer los datos de las respuestas
        const data = await Promise.all(responses.map(response => response.json()));

        // Flatten el array de tareas y actualizar el estado
        setTasks(data.flat());
      } catch (error) {
        console.error("Error al cargar las tareas", error);
        Swal.fire("Error", "No se pudo cargar las tareas.", "error");
        setTasks([]);
      }
    };

    fetchTasks();
  }, [navigate]);

  // Función para manejar el cambio de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type !== "application/pdf") {
      Swal.fire("Error", "Solo se pueden subir archivos PDF.", "error");
      setSelectedFile(null); // Limpiar el archivo seleccionado
    } else {
      setSelectedFile(file);
    }
  };

  // Función para subir un archivo asociado a una tarea
  const handleFileUpload = async (taskId) => {
    if (!selectedFile) {
      Swal.fire("Error", "Por favor, selecciona un archivo para subir.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("archivo", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/tareas/upload/${taskId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al subir el archivo");
      }

      const data = await response.json();
      Swal.fire("Éxito", "Archivo subido correctamente", "success");
      console.log("Archivo subido:", data);
    } catch (error) {
      console.error("Error al subir archivo", error);
      Swal.fire("Error", "No se pudo subir el archivo", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6 flex flex-col space-y-6">
        <h2 className="text-3xl font-bold text-center">Aula Virtual</h2>
        <ul className="space-y-4 flex-1">
          <li>
            <Link to="/estudiante-perfil" className="hover:bg-blue-500 p-2 rounded">
              Mi Perfil
            </Link>
          </li>
          <li>
            <Link to="/estudiante-cursos" className="hover:bg-blue-500 p-2 rounded">
              Mis Cursos
            </Link>
          </li>
          <li>
            <Link to="/estudiante-tareas" className="hover:bg-blue-500 p-2 rounded">
              Tareas
            </Link>
          </li>
          <li>
            <Link to="/estudiante-foros" className="hover:bg-blue-500 p-2 rounded">
              Foros
            </Link>
          </li>
        </ul>
        {/* Botón de Cerrar Sesión */}
        <div className="mt-auto"> {/* mt-auto empuja el contenido hacia abajo */}
          <LogoutButton />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Mis Tareas</h1>

        <div className="grid grid-cols-1 gap-6">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition max-w-md ">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{task.titulo}</h2>
                <p className="text-gray-600 mb-3">
                  Fecha de entrega: {new Date(task.fecha_entrega).toLocaleString()}
                </p>
                <p className={`text-sm ${task.estado === "Pendiente" ? "text-red-500" : "text-green-500"} mb-2`}>
                  Estado: {task.estado}
                </p>
                <input type="file" className="mb-2" onChange={handleFileChange} />
                <button
                  className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                  onClick={() => handleFileUpload(task.id)}
                >
                  Subir Archivo
                </button>
              </div>
            ))
          ) : (
            <p>No hay tareas disponibles o hubo un error al cargar las tareas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tareas;
