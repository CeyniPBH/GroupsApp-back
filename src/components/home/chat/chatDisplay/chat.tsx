import { useState } from 'react';
import TextBox from '../textbox/textBox';
import MessagesList from '../messageList/MessageList';
import Navbar from '../../navbar/Navbar';
interface ChatProps {
  userId: string;
}

const Chat = ({ userId }: ChatProps) => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, `${userId}: ${message}`]);
  };
  return(
  <div className="flex flex-col h-full">
        <Navbar userName={userId}/>
        <section id="messages" className='flex-1'>
              <MessagesList messages={messages} />
        </section>
            <div id="textbox" className='h-14 w-11/12 bg-black mx-auto mb-2 mt-2 rounded-xl'>
            <TextBox onSendMessage={handleSendMessage}/>
            </div>
  </div>);
};

export default Chat