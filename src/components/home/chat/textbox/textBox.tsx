import { useState } from 'react';

interface TextBoxProps {
  onSendMessage: (message: string) => void;
}

const TextBox = ({ onSendMessage }: TextBoxProps) => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Previene comportamiento por defecto
      if (message.trim()) {
        onSendMessage(message);
        setMessage('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <input
          id="chat textbox"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje..."
          className="flex-1 h-14 px-4 text-white rounded-2xl focus:outline-none "
        />
        <button
          type="submit"
          className=" h-14 text-white rounded-xl text-lg hover:inset-shadow-zinc-900 inset-shadow-xs hover:text-[17px]  "
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default TextBox;