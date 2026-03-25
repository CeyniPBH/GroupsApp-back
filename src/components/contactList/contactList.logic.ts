import { useState, useEffect } from 'react';
import { contactsAPI, usersAPI } from '../../services/api';
import type { User } from './contactList.types';

export const useContactList = (
  usuarioActual: User | null,
  onSelectContacto: (contacto: User) => void
) => {
  const [contactos, setContactos] = useState<User[]>([]);
  const [usuariosDisponibles, setUsuariosDisponibles] = useState<User[]>([]);
  const [popUpAbierto, setPopUpAbierto] = useState(false);

  useEffect(() => {
    contactsAPI.getContacts().then((res: any) => {
      setContactos(res.data);
    }).catch((err: any) => console.error('Error cargando contactos:', err));

    usersAPI.search('').then((res: any) => {
      setUsuariosDisponibles(res.data);
    }).catch((err: any) => console.error('Error cargando usuarios:', err));
  }, []);

  // Filtrar usuarios ya agregados
  const disponibles = usuariosDisponibles.filter(
    u => !contactos.some(c => c.id === u.id) && u.id !== usuarioActual?.id
  );

  const agregarContacto = (usuario: User) => {
    contactsAPI.addContact(usuario.id).then(() => {
      setContactos(prev => [...prev, usuario]);
      setPopUpAbierto(false);
    }).catch((err: any) => console.error('Error agregando contacto:', err));
  };

  const eliminarContacto = (usuario: User) => {
    contactsAPI.removeContact(usuario.id).then(() => {
      setContactos(prev => prev.filter(c => c.id !== usuario.id));
      if (usuarioActual?.id === usuario.id) {
        const siguiente = contactos.filter(c => c.id !== usuario.id)[0];
        onSelectContacto(siguiente || null!);
      }
    }).catch((err: any) => console.error('Error eliminando contacto:', err));
  };

  return {
    contactos,
    usuariosDisponibles: disponibles,
    popUpAbierto,
    setPopUpAbierto,
    agregarContacto,
    eliminarContacto,
  };
};
