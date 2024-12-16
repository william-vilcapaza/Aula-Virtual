import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Estudent from './components/Estudent';
import Teacher from './components/Teacher';
import CrearForo from './components/CrearForo';

import RoleRedirect from './components/RolRedirect';

// Componentes para cada sección del estudiante
import MiPerfil from './components/MiPerfil'; // Sección para el perfil
import MisCursos from './components/MisCursos'; // Sección para los cursos
import Tareas from './components/Tareas'; // Sección para las tareas
import Curso from './components/Curso';
import Foros from './components/Foros';

// Componentes para cada sección del profesor
import MiPerfilTeacher from './components/MiPerfilTeacher';
import MisCursosTeacher from './components/MisCursosTeacher';
import TareasTeacher from './components/TareasTeacher';
import CursoTeacher from './components/CursoTeacher';
import ForosTeacher from './components/ForosTeacher';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />

        <Route path="/estudiante-dashboard" element={<Estudent />} />
        {/* Rutas para el estudiante */}
        <Route path="/estudiante-perfil" element={<MiPerfil />} />
        <Route path="/estudiante-cursos" element={<MisCursos />} />
        <Route path="/estudiante-tareas" element={<Tareas />} />
        <Route path="/estudiante-foros" element={<Foros />} />
        <Route path="/curso/:id" element={<Curso />} /> {/* Ruta para Curso con el id */}
        



        {/* Ruta por defecto */}
        <Route path="/profesor-dashboard" element={<Teacher />} />
        {/* Rutas para el profesor */}
        <Route path="/profesor-perfil" element={<MiPerfilTeacher />} />
        <Route path="/profesor-cursos" element={<MisCursosTeacher />} />
        <Route path="/profesor-tareas" element={<TareasTeacher />} />
        <Route path="/profesor-foros" element={<ForosTeacher />} />
        <Route path="/cursoteacher/:id" element={<CursoTeacher />} />

        {/* Ruta para crear foro */}
        <Route path="/crear-foro" element={<CrearForo />} />

      </Routes>
    </Router>
  );
}

export default App;
