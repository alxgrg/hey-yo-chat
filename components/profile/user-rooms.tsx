// import { useEffect, useState, useContext } from 'react';
// import {
//   getDatabase,
//   ref,
//   push,
//   remove,
//   onValue,
//   child,
// } from 'firebase/database';
// import { useRouter } from 'next/router';
// import Link from 'next/link';

// import AuthContext from '../../store/auth-context';

// import Button from '../ui/button';
// import Input from '../ui/input';

// import type { ChatRoom } from '../../types';

// const UserRooms = () => {
//   const [chatName, setChatName] = useState('');
//   const [chatrooms, setChatrooms] = useState<ChatRoom[]>([]);

//   const { isLoading, currentUser, signout } = useContext(AuthContext);

//   const router = useRouter();

//   useEffect(() => {
//     if (!currentUser) {
//       return;
//     }

//     const db = getDatabase();
//     const chatRoomsRef = ref(db, 'user-chats/' + currentUser.uid);

//     return onValue(chatRoomsRef, (snapshot) => {
//       const data = snapshot.val();
//       // If no messages in db, nope out.
//       if (!data) {
//         setChatrooms([]);
//         return;
//       }
//       const formattedData = Object.keys(data).map((id) => {
//         return { id: id, ...data[id] };
//       });
//       setChatrooms(formattedData);
//       console.log(formattedData);
//     });
//   }, [currentUser, isLoading, router]);

//   const handleCreateRoom = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!currentUser) {
//       return;
//     }
//     const db = getDatabase();
//     const chatRef = ref(db, 'chats/');
//     const userChatRef = ref(db, 'user-chats/' + currentUser.uid);
//     if (!chatName || chatName.trim().length === 0) {
//       return;
//     }
//     try {
//       const newChildRef = push(chatRef, {
//         chatName: chatName,
//         userId: currentUser.uid,
//       }).key;

//       push(userChatRef, {
//         chatId: newChildRef,
//         chatName: chatName,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDeleteRoom = (chatId: string, userChatId: string) => {
//     if (!currentUser) {
//       return;
//     }
//     const db = getDatabase();
//     const chatRef = ref(db, 'chats/' + chatId);
//     const userChatRef = ref(
//       db,
//       'user-chats/' + currentUser.uid + '/' + userChatId
//     );
//     const chatMessagesRef = ref(db, 'chat_messages/' + chatId);

//     try {
//       remove(chatRef);

//       remove(userChatRef);
//       remove(chatMessagesRef);
//       console.log('chatRef', chatRef);
//       console.log('userChatRef', userChatRef);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <div className='flex flex-col'>
//         {chatrooms && chatrooms.length > 0 ? (
//           chatrooms.map((chatroom) => (
//             <div key={chatroom.id} className='p-2 mb-3'>
//               <Link href={`/chat/${chatroom.chatId}`}>{chatroom.chatName}</Link>
//               <Button
//                 color='bg-red-400'
//                 onClick={() => handleDeleteRoom(chatroom.chatId, chatroom.id)}
//               >
//                 Delete room
//               </Button>
//             </div>
//           ))
//         ) : (
//           <p>
//             You currently have no chatrooms created. Create a room to get
//             started.
//           </p>
//         )}
//       </div>
//       <form onSubmit={handleCreateRoom}>
//         <Input
//           type='text'
//           name='chat-name'
//           onChange={(e) => setChatName(e.target.value)}
//           required
//           value={chatName}
//         />
//         <Button>Create new room</Button>
//       </form>
//     </div>
//   );
// };

// export default UserRooms;

import { useEffect, useState, useContext } from 'react';
import {
  getDatabase,
  ref,
  push,
  remove,
  onValue,
  child,
} from 'firebase/database';
import { useRouter } from 'next/router';
import Link from 'next/link';

import AuthContext from '../../store/auth-context';

import Button from '../ui/button';
import Input from '../ui/input';

import type { ChatRoom } from '../../types';

const UserRooms = () => {
  const [chatName, setChatName] = useState('');
  const [chatrooms, setChatrooms] = useState<ChatRoom[]>([]);

  const { isLoading, currentUser, signout } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const db = getDatabase();
    const chatRoomsRef = ref(db, 'user-chats/' + currentUser.uid);

    return onValue(chatRoomsRef, (snapshot) => {
      const data = snapshot.val();
      // If no messages in db, nope out.
      if (!data) {
        setChatrooms([]);
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

  const handleDeleteRoom = (chatId: string, userChatId: string) => {
    if (!currentUser) {
      return;
    }
    const db = getDatabase();
    const chatRef = ref(db, 'chats/' + chatId);
    const userChatRef = ref(
      db,
      'user-chats/' + currentUser.uid + '/' + userChatId
    );
    const chatMessagesRef = ref(db, 'chat_messages/' + chatId);

    const chatMembersRef = ref(db, 'chat_members/' + chatId);

    try {
      remove(chatMembersRef);
      remove(chatRef);

      remove(userChatRef);
      remove(chatMessagesRef);

      console.log('chatRef', chatRef);
      console.log('userChatRef', userChatRef);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='flex flex-wrap'>
        {chatrooms && chatrooms.length > 0 ? (
          chatrooms.map((chatroom) => (
            <div key={chatroom.id} className='p-4 mb-3 border rounded'>
              <Link href={`/chat/${chatroom.chatId}`}>{chatroom.chatName}</Link>
              <Button
                color='bg-red-400'
                onClick={() => handleDeleteRoom(chatroom.chatId, chatroom.id)}
              >
                X
              </Button>
            </div>
          ))
        ) : (
          <p>
            You currently have no chatrooms created. Create a room to get
            started.
          </p>
        )}
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
