// import type { NextPage } from 'next';
// import { useState, useEffect, useContext, useRef } from 'react';
// import { useRouter } from 'next/router';

// import {
//   ref,
//   push,
//   onValue,
//   getDatabase,
//   get,
//   remove,
//   Database,
// } from 'firebase/database';

// import AuthContext from '../../store/auth-context';

// import Input from '../../components/ui/input';
// import Button from '../../components/ui/button';
// import ScrollToBottom from '../../components/ui/scroll-to-bottom';

// const ChatRoom: NextPage = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState<
//     {
//       id: string;
//       chatId: string;
//       username: string;
//       userId: string;
//       message: string;
//     }[]
//   >([]);
//   const [chatName, setChatName] = useState('');
//   const [members, setMembers] = useState<
//     {
//       id: string;
//       userId: string;
//       chatId: string;
//       username: string;
//       userNameColor: string;
//       online: boolean;
//     }[]
//   >([]);

//   const { isLoading, currentUser, signout } = useContext(AuthContext);

//   const router = useRouter();

//   useEffect(() => {
//     if (!currentUser && !isLoading) {
//       router.push('/');
//     }
//     if (!currentUser) {
//       return;
//     }

//     const db = getDatabase();
//     const messagesRef = ref(db, 'chat_messages/' + router.query.id);
//     const chatMembersRef = ref(db, 'chat_members/' + router.query.id);

//     //  Set chat name
//     const getChatName = async (db: Database) => {
//       const chatRef = ref(db, 'chats/' + router.query.id);
//       const res = await get(chatRef);
//       const data = await res.val();
//       const chatName = data.chatName;
//       setChatName(chatName);
//     };

//     getChatName(db);

//     // Get chat members
//     let isMember: any[] = [];

//     const chatMembers = () => {
//       get(chatMembersRef).then((snapshot) => {
//         const data = snapshot.val();

//         if (data) {
//           console.log('snapshot', data);

//           const formattedData = Object.keys(data).map((id) => data[id]);
//           console.log(
//             'formattedData',
//             formattedData.filter((member) => member.userId === currentUser.uid)
//           );

//           isMember = formattedData.filter(
//             (member) => member.userId === currentUser.uid
//           );
//           console.log('isMember', isMember);
//         }

//         if (isMember.length === 0) {
//           try {
//             push(chatMembersRef, {
//               userId: currentUser.uid,
//               chatId: router.query.id,
//               username: currentUser.email,
//               online: true,
//             });
//           } catch (error) {
//             console.log(error);
//           }
//         }
//       });
//     };

//     chatMembers();

//     onValue(chatMembersRef, (snapshot) => {
//       const data = snapshot.val();
//       // If no messages in db, nope out.
//       if (!data) {
//         return;
//       }

//       const formattedData = Object.keys(data).map((id, i) => {
//         return { id: id, ...data[id] };
//       });

//       //  Set message limit
//       const membersLimit = 100;

//       // Delete messages if more than messageLimit
//       // if (formattedData.length >= membersLimit) {
//       //   const firstMessage = formattedData[0];
//       //   remove(
//       //     ref(db, 'chat_messages/' + router.query.id + '/' + firstMessage.id)
//       //   );
//       // }

//       setMembers(formattedData);
//     });

//     // Get messages
//     return onValue(messagesRef, (snapshot) => {
//       const data = snapshot.val();
//       // If no messages in db, nope out.
//       if (!data) {
//         return;
//       }

//       const formattedData = Object.keys(data).map((id) => {
//         return { id: id, ...data[id] };
//       });

//       //  Set message limit
//       const messageLimit = 10;

//       // Delete messages if more than messageLimit
//       if (formattedData.length >= messageLimit) {
//         const firstMessage = formattedData[0];
//         remove(
//           ref(db, 'chat_messages/' + router.query.id + '/' + firstMessage.id)
//         );
//       }

//       setMessages(formattedData);
//     });
//   }, [currentUser, isLoading, router, members]);

//   const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setMessage(event.target.value);
//   };

//   const handleMessageSubmit = async (
//     event: React.FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault();
//     if (!currentUser) {
//       return;
//     }
//     const db = getDatabase();
//     const messageRef = ref(db, 'chat_messages/' + router.query.id);
//     try {
//       push(messageRef, {
//         username: currentUser.email,
//         chatId: router.query.id,
//         userId: currentUser.uid,
//         message: message,
//       });
//       setMessage('');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className='flex flex-col h-[calc(100vh-60px)]'>
//       <div className='flex align-middle'>
//         <h2 className='text-2xl'>
//           Hey, Yo -{' '}
//           <span className='text-pink-400'>{chatName && chatName}</span>
//         </h2>
//       </div>

//       <div className='w-full p-2 border flex flex-col flex-grow h-full overflow-hidden overflow-y-scroll'>
//         {messages.map((message) => {
//           return (
//             <div key={message.id} className='p-2'>
//               <div>
//                 <h1 className='text-xl'>{message.username}: </h1>
//               </div>
//               {message.message}
//             </div>
//           );
//         })}
//         <ScrollToBottom />
//       </div>
//       <form onSubmit={handleMessageSubmit}>
//         <Input
//           type='text'
//           name='message'
//           required
//           autocomplete='off'
//           value={message}
//           onChange={handleMessageChange}
//         />
//         <Button>Send</Button>
//       </form>
//     </div>
//   );
// };

// export default ChatRoom;

import type { NextPage } from 'next';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { ref, get, Database, getDatabase } from 'firebase/database';

import AuthContext from '../../store/auth-context';

import ChatRoom from '../../components/chat/chat-room';

const ChatPage: NextPage = () => {
  const [chatName, setChatName] = useState('');

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

    //  Set chat name
    const getChatName = async (db: Database) => {
      const chatRef = ref(db, 'chats/' + router.query.id);
      const res = await get(chatRef);
      const data = await res.val();
      const chatName = data.chatName;
      setChatName(chatName);
    };

    getChatName(db);
  }, [currentUser, isLoading, router]);

  return (
    <div className='flex flex-col h-[calc(100vh-60px)]'>
      <div className='flex align-middle'>
        <h2 className='text-2xl'>
          Hey, Yo! -{' '}
          <span className='text-pink-400'>{chatName && chatName}</span>
        </h2>
      </div>

      <ChatRoom />
    </div>
  );
};

export default ChatPage;
