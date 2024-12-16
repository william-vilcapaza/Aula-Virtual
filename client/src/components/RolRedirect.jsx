import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleRedirect = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Obtén el usuario desde localStorage

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Si no hay usuario, redirige al login
    } else {
      if (user.rol === 'estudiante') {
        navigate('/estudiante-dashboard'); // Si el rol es estudiante, redirige a la vista de estudiante
      } else if (user.rol === 'profesor') {
        navigate('/profesor-dashboard'); // Si el rol es profesor, redirige a la vista de profesor
      }
    }
  }, [user, navigate]);

  return <div>
  </div>; // Opcional, puede mostrar un mensaje de redirección
};

export default RoleRedirect;
