interface MessageProps {
  text: string;
}

const Message = ({ text }: MessageProps) => {
  return (
    <div className=" text-white p-2 rounded-lg mb-2 max-w-3/4 bg-zinc-700">
      {text}
    </div>
  );
};

export default Message;