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

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
      <form
        onSubmit={handleMessageSubmit}
        className='flex gap-2 mb-2 w-full items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700'
      >
        <textarea
          name='message'
          required
          value={message}
          onChange={handleMessageChange}
          rows={1}
          className='block mx-2 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Your message...'
        ></textarea>
        <button
          type='submit'
          className='inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600'
        >
          <svg
            aria-hidden='true'
            className='w-6 h-6 rotate-90'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
          </svg>
          <span className='sr-only'>Send message</span>
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
