import { useState, useEffect } from 'react';
import TextBox from '../textbox/textBox';
import MessagesList from '../messageList/MessageList';
import Navbar from '../../navbar/Navbar';
import { chatsAPI } from '../../../../services/api';
import socket from '../../../../services/socket';

interface Message {
  id: number;
  content: string;
  type: string;
  senderId: number;
  createdAt: string;
}

interface ChatProps {
  userId: number;
}

const Chat = ({ userId }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<number | null>(null);

  useEffect(() => {
    // Encontrar o crear chat con el usuario
    // Por simplicidad, asumimos que hay un chat directo
    // En realidad, deberías buscar el chat existente o crear uno
    chatsAPI.getChats().then((response: any) => {
      const chats = response.data;
      const directChat = chats.find((chat: any) => 
        chat.isGroup === false && chat.members.some((m: any) => m.id === userId)
      );
      if (directChat) {
        setChatId(directChat.id);
        // Cargar mensajes
        chatsAPI.getMessages(directChat.id).then((res: any) => setMessages(res.data));
      }
    });

    // Escuchar nuevos mensajes
    socket.on('newMessage', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [userId]);

  const handleSendMessage = (message: string) => {
    if (chatId) {
      chatsAPI.sendMessage(chatId, message).then(() => {
        // El mensaje se agregará via socket
      });
    }
  };

  return(
  <div className="flex flex-col h-full">
        <Navbar userName={userId.toString()}/>
        <section id="messages" className='flex-1'>
              <MessagesList messages={messages.map(m => `${m.senderId}: ${m.content}`)} />
        </section>
            <div id="textbox" className='h-14 w-11/12 bg-slate-950 mx-auto mb-2 mt-2 rounded-xl'>
            <TextBox onSendMessage={handleSendMessage}/>
            </div>
  </div>);
};

export default Chat