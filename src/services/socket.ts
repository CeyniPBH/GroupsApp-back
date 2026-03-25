import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

const socket: Socket = io(SOCKET_URL, {
  autoConnect: false, // Conectar manualmente
});

export default socket;

// Eventos de Socket.IO
export const socketEvents = {
  connect: 'connect',
  disconnect: 'disconnect',
  newMessage: 'newMessage',
  userJoined: 'userJoined',
  userLeft: 'userLeft',
};

// Funciones para manejar conexiones
export const connectSocket = (token: string) => {
  socket.auth = { token };
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};