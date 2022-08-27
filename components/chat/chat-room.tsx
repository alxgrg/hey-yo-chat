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

import type { ChatMember, ChatMessage } from '../../types';
import LoadingSpinner from '../ui/loading-spinner';

const ChatRoom: NextPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [members, setMembers] = useState<ChatMember[]>([]);
  const [loading, setLoading] = useState(false);

  const { isLoading, currentUser, signout } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const db = getDatabase();
    const messagesRef = ref(db, 'chat_messages/' + router.query.id);
    const chatMembersRef = ref(db, 'chat_members/' + router.query.id);

    // Get chat members
    // let isMember: any[] = [];
    let isMember = [];

    const chatMembers = () => {
      get(chatMembersRef).then((snapshot) => {
        const data = snapshot.val();

        if (data) {
          console.log('snapshot', data);

          const formattedData = Object.keys(data).map((id) => data[id]);
          console.log(
            'formattedData',
            formattedData.filter((member) => member.userId === currentUser.uid)
          );

          isMember = formattedData.filter(
            (member) => member.userId === currentUser.uid
          );
          console.log('isMember', isMember);
        }

        if (isMember.length === 0) {
          try {
            push(chatMembersRef, {
              userId: currentUser.uid,
              chatId: router.query.id,
              username: currentUser.displayName,
              online: true,
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    };

    chatMembers();

    onValue(chatMembersRef, (snapshot) => {
      const data = snapshot.val();
      // If no messages in db, nope out.
      if (!data) {
        router.push('/');
        return;
      }

      const formattedData = Object.keys(data).map((id, i) => {
        return { id: id, ...data[id] };
      });

      //  Set message limit
      const membersLimit = 100;

      // Delete messages if more than messageLimit
      // if (formattedData.length >= membersLimit) {
      //   const firstMessage = formattedData[0];
      //   remove(
      //     ref(db, 'chat_messages/' + router.query.id + '/' + firstMessage.id)
      //   );
      // }

      setMembers(formattedData);
    });

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
  }, [currentUser, isLoading, router, members]);

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
    <>
      <div className='w-full p-2 bg-gray-700 border border-gray-600 flex flex-col flex-grow h-full overflow-hidden overflow-y-scroll rounded-md'>
        {loading ? (
          <LoadingSpinner />
        ) : (
          messages.map((message) => {
            if (currentUser && message.userId === currentUser.uid) {
              return (
                <div key={message.id} className='p-2 flex flex-col items-end'>
                  <div>
                    <h1 className='text-xl text-pink-400'>
                      {message.username}{' '}
                    </h1>
                  </div>
                  <div className='p-5 bg-blue-600 rounded-xl w-2/3 sm:w-1/2'>
                    <p className='text-white'>{message.message}</p>
                  </div>
                </div>
              );
            }
            return (
              <div key={message.id} className='p-2 flex flex-col items-start'>
                <div>
                  <h1 className='text-xl text-pink-400'>{message.username} </h1>
                </div>
                <div className='p-5 bg-gray-800 rounded-xl w-2/3 sm:w-1/2'>
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
    </>
  );
};

export default ChatRoom;
