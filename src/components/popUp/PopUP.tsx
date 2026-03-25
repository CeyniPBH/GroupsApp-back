// PopUp.tsx
interface PopUpProps {
  usuariosDisponibles: string[];
  onAgregar: (usuario: string) => void;
  onCerrar: () => void;
}

const PopUp = ({ usuariosDisponibles, onAgregar, onCerrar }: PopUpProps) => {
  return (
    <div className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-50">
      <div className="bg-gray-50 rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">Agregar usuario</h2>
          <button 
            onClick={onCerrar}
            className="text-gray-700 hover:text-red-700 text-2xl"
          >
            x
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto border rounded-xl">
          {usuariosDisponibles.length === 0 ? (
            <p className="text-gray-700 text-center py-4">
              No hay usuarios disponibles para agregar
            </p>
          ) : (
            usuariosDisponibles.map(usuario => (
              <div 
                key={usuario}
                className="flex justify-between items-center bg-slate-200 p-3 mb-3 rounded-xl text-gray-700"
              >
                <span className="font-medium">{usuario}</span>
                <button
                  onClick={() => onAgregar(usuario)}
                  className="px-3 py-1 bg-blue-500 text-gray-100 rounded hover:bg-blue-600"
                >
                  Agregar
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUp;