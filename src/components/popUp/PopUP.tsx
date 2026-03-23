// PopUp.tsx
interface PopUpProps {
  usuariosDisponibles: string[];
  onAgregar: (usuario: string) => void;
  onCerrar: () => void;
}

const PopUp = ({ usuariosDisponibles, onAgregar, onCerrar }: PopUpProps) => {
  return (
    <div className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-50">
      <div className="bg-blue-300 rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Agregar usuario</h2>
          <button 
            onClick={onCerrar}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            x
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {usuariosDisponibles.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No hay usuarios disponibles para agregar
            </p>
          ) : (
            usuariosDisponibles.map(usuario => (
              <div 
                key={usuario}
                className="flex justify-between items-center p-3 border-b hover:bg-gray-50"
              >
                <span className="font-medium">{usuario}</span>
                <button
                  onClick={() => onAgregar(usuario)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
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