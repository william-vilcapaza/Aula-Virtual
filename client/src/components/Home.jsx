import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import RoleRedirect from './RolRedirect';

const Home = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: '', nombre: '', email: '', password: '', rol: 'estudiante' });
  const [isEditing, setIsEditing] = useState(false);
  const [coursesData, setCoursesData] = useState([]);  // Estado para los cursos
  const [courseFormData, setCourseFormData] = useState({ id: '', nombre: '', horas: '', horario: '' });
  const [isEditingCourse, setIsEditingCourse] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // Verificar redirección por rol
  useEffect(() => {
    if (user) {
      if (user.rol === 'estudiante') {
        navigate('/estudiante-dashboard');
      } else if (user.rol === 'profesor') {
        navigate('/profesor-dashboard');
      }
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/usuarios', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        Swal.fire('¡Éxito!', 'Usuarios cargados correctamente.', 'success');
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Error al obtener usuarios.', 'error');
    }
  };

  const fetchCoursesData = async () => {  // Función para obtener cursos
    try {
      const response = await fetch('http://localhost:5000/api/cursos', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCoursesData(data);
        Swal.fire('¡Éxito!', 'Cursos cargados correctamente.', 'success');
      } else {
        throw new Error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Error al obtener cursos.', 'error');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCoursesData(); // Cargar cursos cuando se carga el componente
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseInputChange = (e) => {  // Función para manejar los cambios en los campos del formulario de curso
    const { name, value } = e.target;
    setCourseFormData({ ...courseFormData, [name]: value });
  };
  

  const handleEdit = (user) => {
    setFormData({ ...user }); // Copiar datos del usuario a editar
    setIsEditing(true);       // Cambiar el estado a modo edición
  };

  const handleEditCourse = (course) => {  // Función para manejar la edición de un curso
    setCourseFormData({ ...course });  // Copiar datos del curso a editar
    setIsEditingCourse(true);  // Cambiar el estado a modo edición
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing
        ? `http://localhost:5000/api/usuarios/${formData.id}`
        : 'http://localhost:5000/api/usuarios';
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchUsers();
        setFormData({ id: '', nombre: '', email: '', password: '', rol: 'estudiante' });
        setIsEditing(false);
        Swal.fire('¡Éxito!', `Usuario ${isEditing ? 'actualizado' : 'creado'} correctamente.`, 'success');
      } else {
        throw new Error('Failed to save user');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Error al guardar usuario.', 'error');
    }
  };

  const handleCourseSubmit = async (e) => {  // Función para enviar el formulario de creación o edición de curso
    e.preventDefault();
    try {
      const url = isEditingCourse
        ? `http://localhost:5000/api/cursos/${courseFormData.id}`
        : 'http://localhost:5000/api/cursos';
      const method = isEditingCourse ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(courseFormData)
      });
      if (response.ok) {
        fetchCoursesData();
        setCourseFormData({ id: '', nombre: '', horas: '', horario: '' });
        setIsEditingCourse(false);
        Swal.fire('¡Éxito!', `Curso ${isEditingCourse ? 'actualizado' : 'creado'} correctamente.`, 'success');
      } else {
        throw new Error('Failed to save course');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Error al guardar curso.', 'error');
    }
  };
  

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          fetchUsers();
          Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
        } else {
          throw new Error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'Error al eliminar usuario.', 'error');
      }
    }
  };

  const handleDeleteCourse = async (id) => {  // Función para eliminar un curso
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/cursos/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          fetchCoursesData();
          Swal.fire('¡Eliminado!', 'El curso ha sido eliminado.', 'success');
        } else {
          throw new Error('Failed to delete course');
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'Error al eliminar curso.', 'error');
      }
    }
  };

  

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        Swal.fire('¡Sesión cerrada!', 'Has salido correctamente.', 'success');
      }
    });
  };
  
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
//return_______________________________________________________________________________________________
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center items-center">
      <RoleRedirect />
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-gray-700 mb-4">Panel de Administrador</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Cerrar sesión
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <button
              onClick={() => toggleSection('crearUsuario')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full text-left"
            >
              Crear Usuario
            </button>
          
            {expandedSection === 'crearUsuario' && (

<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center items-center">
<RoleRedirect /> {/* Componente que redirige según el rol */}
<div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
  <div className="mb-6 text-center">
    <h1 className="text-3xl font-semibold text-gray-700 mb-4">Usuarios</h1>
  </div>

  <form onSubmit={handleSubmit} className="space-y-4">
    <input
      type="text"
      name="nombre"
      value={formData.nombre}
      onChange={handleInputChange}
      placeholder="Nombre"
      required
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
    />
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      placeholder="Email"
      required
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
    />
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleInputChange}
      placeholder="Contraseña"
      required={!isEditing}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
    />
    <select
      name="rol"
      value={formData.rol}
      onChange={handleInputChange}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
    >
      <option value="estudiante">Estudiante</option>
      <option value="profesor">Profesor</option>
    </select>
    <button type="submit" className="w-full bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-600">
      {isEditing ? 'Actualizar' : 'Crear'} Usuario
    </button>
  </form>
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
    <ul className="space-y-2">
      {users.map(user => (
        <li key={user.id} className="flex justify-between items-center bg-blue-200 p-4 rounded-md shadow-sm">
          <span>{user.nombre} - {user.email} ({user.rol})</span>
          <div>
            <button onClick={() => handleEdit(user)} className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 mr-2">
              Editar
            </button>
            <button onClick={() => handleDelete(user.id)} className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500">
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>
</div>

            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection('crearCurso')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full text-left"
            >
              Crear Curso
            </button>
            {expandedSection === 'crearCurso' && (

<div>
<form onSubmit={handleCourseSubmit} className="space-y-4">
  <input
    type="text"
    name="nombre"
    value={courseFormData.nombre}
    onChange={handleCourseInputChange}
    placeholder="Nombre del curso"
    required
    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
  />
  <input
    type="number"
    name="horas"
    value={courseFormData.horas}
    onChange={handleCourseInputChange}
    placeholder="Horas"
    required
    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
  />
  <input
    type="text"
    name="horario"
    value={courseFormData.horario}
    onChange={handleCourseInputChange}
    placeholder="Horario"
    required
    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
  />
  <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
    {isEditingCourse ? 'Actualizar' : 'Crear'} Curso
  </button>
</form>

<div className="mt-8">
  <h2 className="text-xl font-semibold mb-4">Lista de Cursos</h2>
  <ul className="space-y-2">
    {coursesData.map((course) => (
      <li key={course.id} className="flex justify-between items-center bg-blue-200 p-4 rounded-md shadow-sm">
        <span>{course.nombre} - {course.horas} horas ({course.horario})</span>
        <div>
          <button onClick={() => handleEditCourse(course)} className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 mr-2">
            Editar
          </button>
          <button onClick={() => handleDeleteCourse(course.id)} className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500">
            Eliminar
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>
</div>

            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection('asignarProfesor')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full text-left"
            >
              Asignar Profesor
            </button>
            {expandedSection === 'asignarProfesor' && <p className="mt-4">Funcionalidad para Asignar Profesor (Pendiente de implementación)</p>}
          </div>

          <div>
            <button
              onClick={() => toggleSection('verProfesores')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full text-left"
            >
              Ver Profesores
            </button>
            {expandedSection === 'verProfesores' && (

<div className="mt-8">
<h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
<ul className="space-y-2">
  {users
    .filter(user => user.rol === 'profesor') // Filtramos solo los usuarios con rol 'estudiante'
    .map(user => (
      <li key={user.id} className="flex justify-between items-center bg-blue-200 p-4 rounded-md shadow-sm">
        <span>{user.nombre} - {user.email} ({user.rol})</span>
        <div>
          <button onClick={() => handleEdit(user)} className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 mr-2">
            Editar
          </button>
          <button onClick={() => handleDelete(user.id)} className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500">
            Eliminar
          </button>
        </div>
      </li>
    ))}
</ul>
</div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection('verEstudiantes')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full text-left"
            >
              Ver Estudiantes
            </button>
            {expandedSection === 'verEstudiantes' && (

<div className="mt-8">
  <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
  <ul className="space-y-2">
    {users
      .filter(user => user.rol === 'estudiante') // Filtramos solo los usuarios con rol 'estudiante'
      .map(user => (
        <li key={user.id} className="flex justify-between items-center bg-blue-200 p-4 rounded-md shadow-sm">
          <span>{user.nombre} - {user.email} ({user.rol})</span>
          <div>
            <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2">
              Editar
            </button>
            <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
              Eliminar
            </button>
          </div>
        </li>
      ))}
  </ul>
</div>


            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection('verCursos')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full text-left"
            >
              Ver Cursos
            </button>
            {expandedSection === 'verCursos' && (

<div className="mt-8">
<h2 className="text-xl font-semibold mb-4">Lista de Cursos</h2>
<ul className="space-y-2">
  {coursesData.map((course) => (
    <li key={course.id} className="flex justify-between items-center bg-blue-200 p-4 rounded-md shadow-sm">
      <span>{course.nombre} - {course.horas} horas ({course.horario})</span>
      
    </li>
  ))}
</ul>
</div>

            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
