// ContactList.tsx (maneja TODO lo de contactos)
import { useState } from 'react';
import PopUp from '../popUp/PopUP';

interface ContactListProps {
  usuarioActual: string;
  onSelectContacto: (contacto: string) => void;
}

const ContactList = ({ usuarioActual, onSelectContacto }: ContactListProps) => {
  // Estados que antes estaban en App
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

  return (
    <section id="user" className='h-full w-2/5 flex-row flex'>
      <div className='h-full w-2/12 bg-blue-300'>
        <button
          onClick={() => setPopUpAbierto(true)}
          className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          + Agregar usuario
        </button>
      </div>
      
      <div className='h-full w-10/12 bg-blue-700'>
        <h3 className="font-bold mb-2 ml-3">CONTACTOS</h3>
        {contactos.map(contacto => (
          <div key={contacto} className='justify-between items-center flex w-full p-2'>
            <button
              onClick={() => onSelectContacto(contacto)}
              className={`ml-2 p-2 w-10/12 ${
                usuarioActual === contacto ? 'font-bold text-white' : ''
              }`}
            >
              {contacto}
            </button>
            <button
              onClick={() => eliminarContacto(contacto)}
              className="w-2/12 p-2 text-red-500 hover:text-red-700 hover:bg-red-100"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {popUpAbierto && (
        <PopUp
          usuariosDisponibles={usuariosDisponibles}
          onAgregar={agregarContacto}
          onCerrar={() => setPopUpAbierto(false)}
        />
      )}
    </section>
  );
};

export default ContactList;