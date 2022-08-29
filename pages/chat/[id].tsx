import type { NextPage } from 'next';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { ref, get, Database, getDatabase } from 'firebase/database';

import AuthContext from '../../store/auth-context';

import ChatRoom from '../../components/chat/chat-room';
import ChatMembers from '../../components/chat/chat-members';

const ChatPage: NextPage = () => {
  const [chatName, setChatName] = useState('');
  const [loading, setLoading] = useState(true);

  const { isLoading, currentUser, signout } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!currentUser && !isLoading) {
      router.push('/');
      return;
    }

    const db = getDatabase();

    //  Set chat name
    const getChatName = async (db: Database) => {
      const chatRef = ref(db, 'chats/' + router.query.id);
      try {
        const res = await get(chatRef);
        const data = await res.val();
        const chatName = data.chatName;
        setChatName(chatName);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getChatName(db);
  }, [currentUser, isLoading, router]);

  return (
    <div className='flex flex-col h-[calc(100vh-63px)] sm:px-2 gap-3 pt-2'>
      <div className='flex align-middle'>
        <h2 className='text-2xl text-white'>
          Hey, Yo! -{' '}
          <span className='text-pink-400'>{chatName && chatName}</span>
        </h2>
      </div>
      <div className='flex overflow-hidden gap-2 h-full'>
        <ChatMembers />
        <ChatRoom />
      </div>
    </div>
  );
};

export default ChatPage;
