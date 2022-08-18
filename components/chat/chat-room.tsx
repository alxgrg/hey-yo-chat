import type { NextPage } from 'next';
import { useState, useEffect, useContext } from 'react';

import { ref, push, onValue, getDatabase } from 'firebase/database';

import AuthContext from '../../store/auth-context';
import { useRouter } from 'next/router';

import Input from '../ui/input';
import Button from '../ui/button';

const ChatRoom: NextPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ id: string; message: string }[]>(
    []
  );

  const { isLoading, currentUser, signout } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!currentUser && !isLoading) {
      router.push('/');
    }

    const db = getDatabase();
    const messagesRef = ref(db, 'chat-room/messages');

    return onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      // If no messages in db, nope out.
      if (!data) {
        return;
      }
      const formattedData = Object.keys(data).map((id) => {
        return { id: id, ...data[id] };
      });
      setMessages(formattedData);
    });
  }, [currentUser, isLoading, router]);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleMessageSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!currentUser) {
      return;
    }
    const db = getDatabase();
    const messageRef = ref(db, 'chat-room/messages');
    try {
      push(messageRef, {
        uid: currentUser.uid,
        message: message,
      });
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='h-11'>
      <h1>Chat Room</h1>
      <div className='w-full p-2 border flex flex-col flex-grow overflow-hidden h-32'>
        {messages.map((message) => (
          <div key={message.id}>{message.message}</div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit}>
        <Input
          type='text'
          name='message'
          required
          autocomplete='off'
          value={message}
          onChange={handleMessageChange}
        />
        <Button>Send</Button>
      </form>
    </div>
  );
};

export default ChatRoom;
