import { useState } from 'react';

export const useContactList = (usuarioActual: string, onSelectContacto: (contacto: string) => void) => {
  const [contactos, setContactos] = useState<string[]>(['samuel', 'maria']);
  const [usuariosDisponibles, setUsuariosDisponibles] = useState<string[]>([
    'juan', 'pedro', 'lucia', 'carlos', 'sofia'
  ]);
  const [popUpAbierto, setPopUpAbierto] = useState(false);

  const agregarContacto = (usuario: string) => {
    setContactos([...contactos, usuario]);
    setUsuariosDisponibles(usuariosDisponibles.filter(u => u !== usuario));
    setPopUpAbierto(false);
  };

  const eliminarContacto = (usuario: string) => {
    setContactos(contactos.filter(c => c !== usuario));
    setUsuariosDisponibles([...usuariosDisponibles, usuario]);

    if (usuarioActual === usuario) {
      const nuevoContacto = contactos.filter(c => c !== usuario)[0];
      onSelectContacto(nuevoContacto || '');
    }
  };

  return {
    contactos,
    usuariosDisponibles,
    popUpAbierto,
    setPopUpAbierto,
    agregarContacto,
    eliminarContacto
  };
};