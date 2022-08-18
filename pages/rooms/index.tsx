import { NextPage } from 'next';

import ChatRoom from '../../components/chat/chat-room';

const ChatRooms: NextPage = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-1/2 text-center'>
        <h1>Chat Rooms</h1>
        <ChatRoom />
      </div>
    </div>
  );
};

export default ChatRooms;
