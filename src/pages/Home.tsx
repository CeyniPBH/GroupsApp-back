import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactList from '../components/contactList/contactList';
import Chat from '../components/home/chat/chatDisplay/chat';
import { connectSocket, disconnectSocket } from '../services/socket';
import type { User } from '../components/contactList/contactList.types';

type Contact = {
  id: number;
  userId: number;
  contactId: number;
  status: string;
  requester: User;
  receiver: User;
};

const HomePage = () => {
  const navigate = useNavigate();
  const [usuarioActual, setUsuarioActual] = useState<User | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    //Cargar el usuario desde localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUsuarioActual(user);
      } catch (error) {
        console.error('Error parseando user:', error);
      }
    }
    

    if(token){connectSocket(token);}
    return () => {
      disconnectSocket();
    };
  }, [navigate]);
  const contactoReal = selectedContact
  ? (selectedContact.requester.id === usuarioActual?.id
      ? selectedContact.receiver
      : selectedContact.requester)
  : null;
  return (
    <div id="app" className="flex h-screen w-full">
      <ContactList
        usuarioActual={usuarioActual}
        onSelectContacto={(contacto) => setSelectedContact(contacto as any)}
      />
      <section id="chat" className='h-full w-3/5 bg-gray-800 flex flex-col'>
        
        {usuarioActual && selectedContact ? (
          <Chat
            key={selectedContact.id}
            userId={usuarioActual.id}
            contactId={contactoReal!.id}
            contactName={contactoReal!.name}
            contactTag={contactoReal!.tag}
          />) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Selecciona un contacto para empezar a chatear
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
