import { useState, useEffect } from 'react';
import ContactList from '../components/contactList/contactList'; 
import Chat from '../components/home/chat/chatDisplay/chat'; 

const HomePage = () => {
  const [usuarioActual, setUsuarioActual] = useState('samuel');

  const handleSendMessage = (message: string) => {
    // aquí deberías conectar con db
    console.log('Mensaje enviado:', message);
  };

  // Verificar autenticación al cargar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirigir a login si no hay token
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div id="app" className="flex h-screen w-full">
      <ContactList
        usuarioActual={usuarioActual}
        onSelectContacto={setUsuarioActual}
      />
      <section id="chat" className='h-full w-3/5 bg-gray-800 flex flex-col'>
        <div className="flex justify-end p-2">
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Cerrar sesión
          </button>
        </div>
        <Chat key={usuarioActual} userId={usuarioActual} />
      </section>
    </div>
  );
};

export default HomePage;