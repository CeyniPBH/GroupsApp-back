import './App.css'
import Chat from './components/home/chat/chatDisplay/chat';
import { useState } from 'react';
import PopUp from './components/popUp/PopUP';
function App() {
   
   const [contactos, setContactos] = useState<string[]>(['samuel', 'maria']);
   const [usuariosDisponibles, setUsuariosDisponibles] = useState<string[]>([
    'juan', 'pedro', 'lucia', 'carlos','sofia'
  ]);
  const [usuarioActual, setUsuarioActual] = useState('samuel');
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
      setUsuarioActual(nuevoContacto || '');
    }
  };
  const handleSendMessage = (message: string) => {
    //aqui deberias conectar con db
  };
  const cerrarPopUp = () => {
    setPopUpAbierto(false);
  };
  return (
      <div id="app" className="flex h-screen w-full">
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
          <div
          key={contacto} className='justify-between items-center flex w-full p-2 '> 
          <button
            key={contacto}
            onClick={() => setUsuarioActual(contacto)}
            className={`ml-2 p-2 w-10/12`}
          >
            {contacto} 
          </button>
          <button
              onClick={() => eliminarContacto(contacto)}
              className=" w-2/12 p-2 text-red-500 hover:text-red-700 hover:bg-red-100 "
              title="Eliminar contacto"
            >
              X
            </button>
          </div>))}
      </div>
          </section>
          <section id="chat" className=' h-full w-3/5 bg-emerald-300 flex flex-col'>
            <Chat key={usuarioActual} userId={usuarioActual} />
            
          </section>
          {popUpAbierto && (
        <PopUp 
        usuariosDisponibles={usuariosDisponibles}
          onAgregar={agregarContacto}
          onCerrar={cerrarPopUp}
          />
          )}
      </div>
  )
}
export default App
