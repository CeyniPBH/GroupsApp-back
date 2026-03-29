export interface MessageItem {
  id: number;
  content: string;
  isMine: boolean;
  senderName: string;
}

const Message = ({content, isMine, senderName}: MessageItem) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isMine ? 'flex-end' : 'flex-start',
        marginBottom: '8px'
      }}
    >
      <div
        className="text-white p-2 rounded-lg max-w-3/4"
        style={{
          backgroundColor: isMine ? "slateblue" : '#3f3f46',
        }}
      >{!isMine && (<div className="text-sm">{senderName}:</div>)}
      <div className="text-base">
        {content}
      </div>
      </div>
    </div>
  );
};

export default Message;