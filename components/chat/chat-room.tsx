import type { NextPage } from 'next';
import { useState, useEffect, useContext } from 'react';

import {
  ref,
  push,
  onValue,
  getDatabase,
  get,
  remove,
} from 'firebase/database';

import AuthContext from '../../store/auth-context';
import { useRouter } from 'next/router';

import Input from '../ui/input';
import ScrollToBottom from '../ui/scroll-to-bottom';

import type { ChatMessage } from '../../types';
import LoadingSpinner from '../ui/loading-spinner';

const ChatRoom: NextPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const { isLoading, currentUser, signout } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const db = getDatabase();
    const messagesRef = ref(db, 'chat_messages/' + router.query.id);

    // Get messages
    return onValue(messagesRef, (snapshot) => {
      setLoading(true);
      const data = snapshot.val();
      // If no messages in db, nope out.
      if (!data) {
        setLoading(false);
        return;
      }

      const formattedData = Object.keys(data).map((id) => {
        return { id: id, ...data[id] };
      });

      //  Set message limit
      const messageLimit = 100;

      // Delete messages if more than messageLimit
      if (formattedData.length >= messageLimit) {
        const firstMessage = formattedData[0];
        remove(
          ref(db, 'chat_messages/' + router.query.id + '/' + firstMessage.id)
        );
      }
      setLoading(false);
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
    const messageRef = ref(db, 'chat_messages/' + router.query.id);
    const chatRoomRef = ref(db, 'chats/' + router.query.id);

    // Check if chatroom still exists and if not redirect.
    // This prevents orphan chat being created if room creactor deletes room while users are still in chat.
    try {
      const snapshot = await get(chatRoomRef);
      if (snapshot.exists()) {
        try {
          push(messageRef, {
            username: currentUser.displayName,
            chatId: router.query.id,
            userId: currentUser.uid,
            message: message,
          });
          setMessage('');
        } catch (error) {
          console.log(error);
        }
      } else {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col flex-grow gap-2'>
      <div className='w-full p-2 bg-gray-700 border border-gray-600 flex flex-col flex-grow h-full overflow-hidden overflow-y-scroll rounded-md'>
        {loading ? (
          <LoadingSpinner />
        ) : (
          messages.map((message) => {
            if (currentUser && message.userId === currentUser.uid) {
              return (
                <div key={message.id} className='p-2 flex flex-col items-end'>
                  <div>
                    <h1 className='text-xl text-white'>{message.username} </h1>
                  </div>
                  <div className='p-5 bg-blue-600 rounded-xl '>
                    <p className='text-white'>{message.message}</p>
                  </div>
                </div>
              );
            }
            return (
              <div key={message.id} className='p-2 flex flex-col items-start'>
                <div>
                  <h1 className='text-xl text-white'>{message.username} </h1>
                </div>
                <div className='p-5 bg-pink-500 rounded-xl max-w-2/3'>
                  <p className='text-white'>{message.message}</p>
                </div>
              </div>
            );
          })
        )}
        <ScrollToBottom />
      </div>
      <form onSubmit={handleMessageSubmit} className='flex gap-2 mb-2 w-full'>
        <Input
          type='text'
          name='message'
          required
          autocomplete='off'
          value={message}
          onChange={handleMessageChange}
          buttonContent='Send'
          placeholder='Message...'
        />
      </form>
    </div>
  );
};

export default ChatRoom;
