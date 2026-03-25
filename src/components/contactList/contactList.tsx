import PopUp from '../popUp/PopUP';
import type { ContactListProps } from './contactList.types';
import { useContactList } from './contactList.logic';
import AddUserIcon from '../../assets/addUser.svg';

const ContactList = ({ usuarioActual, onSelectContacto }: ContactListProps) => {
  const {
    contactos,
    usuariosDisponibles,
    popUpAbierto,
    setPopUpAbierto,
    agregarContacto,
    eliminarContacto,
  } = useContactList(usuarioActual, onSelectContacto);

  return (
    <section id="user" className='h-full w-2/5 flex-row flex'>
      <div className='h-full w-2/12 bg-slate-950 flex flex-col justify-end'>
        <button
          onClick={() => setPopUpAbierto(true)}
          className="mt-4 p-2 text-white rounded flex justify-center hover:text-gray-200"
        >
          <AddUserIcon className="w-10 h-10" />
        </button>
      </div>

      <div className='h-full w-10/12 border-r-4 border-r-slate-950/30 bg-slate-900'>
        <h3 className="font-bold h-19 text-2xl content-center ml-5">CONTACTOS</h3>
        <div id="line" className='border-t-4 border-t-slate-950/30 pb-4'></div>
        {contactos.map(contacto => (
          <div key={contacto.id} className='text-xl justify-between rounded-xl flex mb-2 mx-4 w-[13/14] bg-slate-800 hover:bg-slate-700'>
            <button
              onClick={() => onSelectContacto(contacto)}
              className={`w-10/12 ${usuarioActual?.id === contacto.id ? 'font-bold text-white' : ''}`}
            >
              {contacto.name}#{contacto.tag}
            </button>
            <button
              onClick={() => eliminarContacto(contacto)}
              className="w-2/12 p-2 text-slate-800 hover:text-red-500"
            >
              x
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
