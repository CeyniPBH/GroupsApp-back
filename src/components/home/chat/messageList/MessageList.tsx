import Message from "../message/Message";

interface MessagesListProps {
  messages: string[];
}

const MessagesList = ({ messages }: MessagesListProps) => {
  return (
    <div className="flex flex-col p-4">
      {messages.map((msg, index) => (
        <Message key={index} text={msg} />
      ))}
    </div>
  );
};

export default MessagesList;