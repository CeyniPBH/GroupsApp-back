import Message from "../message/Message";
import type { MessageItem } from "../message/Message";

interface MessageProps {
  messages: MessageItem[];
}


const MessagesList = ({ messages }: MessageProps) => {
  return (
    <div className="flex flex-col p-4">
      {messages.map(msg => (
        <Message key={msg.id} {...msg} />
      ))}
    </div>
  );
};

export default MessagesList;