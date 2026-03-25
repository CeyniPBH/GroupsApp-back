import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactList from '../components/contactList/contactList';
import Chat from '../components/home/chat/chatDisplay/chat';
import { connectSocket, disconnectSocket } from '../services/socket';
import type { User } from '../components/contactList/contactList.types';

const HomePage = () => {
  const navigate = useNavigate();
  const [usuarioActual, setUsuarioActual] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    connectSocket(token);
    return () => {
      disconnectSocket();
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
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
        {usuarioActual && <Chat key={usuarioActual.id} userId={usuarioActual.id} />}
      </section>
    </div>
  );
};

export default HomePage;
