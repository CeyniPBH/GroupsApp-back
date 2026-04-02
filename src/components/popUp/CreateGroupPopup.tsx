import { useState } from 'react';
import type { User } from '../contactList/contactList.types';

interface CreateGroupPopupProps {
  contactos: User[];
  onCrear: (name: string, participantes: User[]) => void;
  onCerrar: () => void;
}

const CreateGroupPopup = ({ contactos, onCrear, onCerrar }: CreateGroupPopupProps) => {
  const [nombreGrupo, setNombreGrupo] = useState('');
  const [seleccionados, setSeleccionados] = useState<number[]>([]);

  const toggleParticipante = (id: number) => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const participantesSeleccionados = contactos.filter(c => seleccionados.includes(c.id));

  const handleCrear = () => {
    if (!nombreGrupo.trim()) return;
    if (participantesSeleccionados.length === 0) return;
    onCrear(nombreGrupo, participantesSeleccionados);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-50">
      <div className="bg-gray-50 rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">Crear grupo</h2>
          <button
            onClick={onCerrar}
            className="text-gray-700 hover:text-red-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Nombre del grupo</label>
          <input
            type="text"
            value={nombreGrupo}
            onChange={(e) => setNombreGrupo(e.target.value)}
            placeholder="Ej. Equipo Proyecto"
            className="w-full p-2 border rounded-lg text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Participantes</label>
          <div className="max-h-60 overflow-y-auto border rounded-lg p-2">
            {contactos.length === 0 ? (
              <p className="text-gray-500 text-center py-2">No tienes contactos</p>
            ) : (
              contactos.map(contacto => (
                <div
                  key={contacto.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <span className="text-gray-700">
                    {contacto.name}#{contacto.tag}
                  </span>
                  <input
                    type="checkbox"
                    checked={seleccionados.includes(contacto.id)}
                    onChange={() => toggleParticipante(contacto.id)}
                    className="w-5 h-5"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCerrar}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleCrear}
            disabled={!nombreGrupo.trim() || participantesSeleccionados.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Crear grupo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPopup;