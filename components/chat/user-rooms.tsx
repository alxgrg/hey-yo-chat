import { useEffect, useState, useContext } from 'react';
import { getDatabase, ref, push, remove, onValue } from 'firebase/database';
import { useRouter } from 'next/router';

import AuthContext from '../../store/auth-context';
import ModalContext from '../../store/modal-context';

import Button from '../ui/button';
import Input from '../ui/input';
import RoomItem from './room-item';

import type { ChatRoom } from '../../types';
import LoadingSpinner from '../ui/loading-spinner';

const UserRooms = () => {
  const [chatName, setChatName] = useState('');
  const [chatrooms, setChatrooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);

  const { isLoading, currentUser, signout } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const db = getDatabase();
    const chatRoomsRef = ref(db, 'user_chats/' + currentUser.uid);

    return onValue(chatRoomsRef, (snapshot) => {
      const data = snapshot.val();
      // If no messages in db, nope out.
      if (!data) {
        setLoading(false);
        setChatrooms([]);
        return;
      }
      const formattedData = Object.keys(data).map((id) => {
        return { id: id, ...data[id] };
      });
      setLoading(false);
      setChatrooms(formattedData);
    });
  }, [currentUser, isLoading, router]);

  const handleCreateRoom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser) {
      return;
    }
    const db = getDatabase();
    const chatRef = ref(db, 'chats/');
    const userChatRef = ref(db, 'user_chats/' + currentUser.uid);
    if (!chatName || chatName.trim().length === 0) {
      return;
    }
    try {
      const newChildRef = push(chatRef, {
        chatName: chatName,
        userId: currentUser.uid,
      }).key;

      push(userChatRef, {
        chatId: newChildRef,
        chatName: chatName,
      });
      setChatName('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRoom = (chatId: string, userChatId: string) => {
    if (!currentUser) {
      return;
    }
    const db = getDatabase();
    const chatRef = ref(db, 'chats/' + chatId);
    const userChatRef = ref(
      db,
      'user_chats/' + currentUser.uid + '/' + userChatId
    );
    const chatMessagesRef = ref(db, 'chat_messages/' + chatId);

    const chatMembersRef = ref(db, 'chat_members/' + chatId);

    try {
      // The order of removal matters here. DB relationships need to be accounted for.
      remove(chatMessagesRef);
      remove(chatMembersRef);
      remove(chatRef);

      remove(userChatRef);
    } catch (error) {
      console.log(error);
    }
  };

  let content;
  if (chatrooms && chatrooms.length > 0) {
    content = chatrooms.map((chatroom) => (
      <RoomItem
        key={chatroom.id}
        chatroom={chatroom}
        onDelete={handleDeleteRoom}
      />
    ));
  } else {
    content = <p className='text-gray-400'>Create a room to get started...</p>;
  }

  return (
    <>
      <form
        onSubmit={handleCreateRoom}
        className='flex justify-center items-center  w-full gap-2'
      >
        <div className='w-full max-w-xl px-4'>
          <Input
            type='text'
            name='chat-name'
            onChange={(e) => setChatName(e.target.value)}
            required
            value={chatName}
            buttonContent='Create room'
            placeholder='Room name...'
            autocomplete='off'
          />
        </div>
      </form>
      <div className='flex flex-wrap gap-2 justify-center'>
        {loading ? <LoadingSpinner /> : content}
      </div>
    </>
  );
};

export default UserRooms;
