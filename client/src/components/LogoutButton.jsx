// LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LogoutButton = () => {
  const navigate = useNavigate();

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

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
