import { useEffect, useState, useContext } from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { useRouter } from 'next/router';
import Link from 'next/link';

import AuthContext from '../../store/auth-context';

import Button from '../ui/button';
import Input from '../ui/input';

const UserRooms = () => {
  const [chatName, setChatName] = useState('');
  const [chatrooms, setChatrooms] = useState<
    { id: string; chatId: string; chatName: string }[]
  >([]);

  const { isLoading, currentUser, signout } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!currentUser && !isLoading) {
      router.push('/');
    }
    if (!currentUser) {
      return;
    }

    const db = getDatabase();
    const chatRoomsRef = ref(db, 'user-chats/' + currentUser.uid);

    return onValue(chatRoomsRef, (snapshot) => {
      const data = snapshot.val();
      // If no messages in db, nope out.
      if (!data) {
        return;
      }
      const formattedData = Object.keys(data).map((id) => {
        return { id: id, ...data[id] };
      });
      setChatrooms(formattedData);
      console.log(formattedData);
    });
  }, [currentUser, isLoading, router]);

  const handleCreateRoom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser) {
      return;
    }
    const db = getDatabase();
    const chatRef = ref(db, 'chats/');
    const userChatRef = ref(db, 'user-chats/' + currentUser.uid);
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='flex flex-col'>
        {chatrooms &&
          chatrooms.map((chatroom) => (
            <div key={chatroom.id} className='p-2 mb-3'>
              <Link href={`/chat/${chatroom.chatId}`}>{chatroom.chatName}</Link>
              <hr />
            </div>
          ))}
      </div>
      <form onSubmit={handleCreateRoom}>
        <Input
          type='text'
          name='chat-name'
          onChange={(e) => setChatName(e.target.value)}
          required
          value={chatName}
        />
        <Button>Create new room</Button>
      </form>
    </div>
  );
};

export default UserRooms;
