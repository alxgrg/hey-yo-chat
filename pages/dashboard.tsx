// import { useEffect, useState, useContext } from 'react';
// import { useRouter } from 'next/router';
// import { getDatabase, ref, push, onValue } from 'firebase/database';

// import type { NextPage } from 'next';
// import type { ChatRoom } from '../types';

// import AuthContext from '../store/auth-context';

// import Button from '../components/ui/button';
// import Input from '../components/ui/input';

// const DUMMY_NAME = 'Chatty McChatface';

// const Dashboard: NextPage = () => {
//   const [chatrooms, setChatrooms] = useState<ChatRoom[]>([]);
//   const [chatName, setChatName] = useState('');
//   const { isLoading, currentUser, signout } = useContext(AuthContext);

//   const router = useRouter();

//   // useEffect(() => {
//   //   if (!currentUser && !isLoading) {
//   //     router.push('/');
//   //   }
//   // }, [router, currentUser, isLoading]);

//   // if (isLoading || !currentUser) {
//   //   return <p>Loading...</p>;
//   // }

//   useEffect(() => {
//     if (!currentUser && !isLoading) {
//       router.push('/');
//     }
//     if (!currentUser) {
//       return;
//     }

//     const db = getDatabase();
//     const chatRoomsRef = ref(db, 'user/' + currentUser.uid + '/chatrooms');

//     return onValue(chatRoomsRef, (snapshot) => {
//       const data = snapshot.val();
//       // If no messages in db, nope out.
//       if (!data) {
//         return;
//       }
//       const formattedData = Object.keys(data).map((id) => {
//         return { id: id, ...data[id] };
//       });
//       setChatrooms(formattedData);
//     });
//   }, [currentUser, isLoading, router]);

//   const handleCreateNewRoom = async (
//     event: React.FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault();
//     if (!currentUser) {
//       return;
//     }
//     const db = getDatabase();
//     const chatRef = ref(db, 'user/' + currentUser.uid + '/chatrooms');
//     try {
//       push(chatRef, {
//         name: chatName,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className='flex justify-center align-center'>
//       <div className='flex flex-col text-3xl w-1/2 text-center'>
//         <h1>User Name&apos;s dashboard</h1>
//         <div className='flex'>
//           {/* <div className='p-2 bg-slate-300 border rounded'>Chat 1</div>
//           <div className='p-2 bg-slate-300 border rounded'>Chat 2</div>
//           <div className='p-2 bg-slate-300 border rounded'>Chat 3</div> */}
//           {chatrooms.map((chatroom) => (
//             <div key={chatroom.id}>{chatroom.name}</div>
//           ))}
//         </div>
//         <div>
//           <form onSubmit={handleCreateNewRoom}>
//             <Input
//               type='text'
//               name='chat-name'
//               onChange={(e) => setChatName(e.target.value)}
//               value={chatName}
//             />
//             <Button>Create new room</Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import { useEffect, useState, useContext } from 'react';
// import { useRouter } from 'next/router';
// import { getDatabase, ref, push, onValue } from 'firebase/database';

// import type { NextPage } from 'next';
// import type { ChatRoom } from '../types';

// import AuthContext from '../store/auth-context';

// import Button from '../components/ui/button';
// import Input from '../components/ui/input';
// import Link from 'next/link';

// const DUMMY_NAME = 'Chatty McChatface';

// const Dashboard: NextPage = () => {
//   const [chatrooms, setChatrooms] = useState<{ id: string; chatId: string }[]>(
//     []
//   );
//   const [chatName, setChatName] = useState('');
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
//     // const chatRoomsRef = ref(db, 'user/' + currentUser.uid + '/chats');
//     const chatRoomsRef = ref(db, 'user-chats/' + currentUser.uid);

//     return onValue(chatRoomsRef, (snapshot) => {
//       const data = snapshot.val();
//       // If no messages in db, nope out.
//       if (!data) {
//         return;
//       }
//       const formattedData = Object.keys(data).map((id) => {
//         return { id: id, ...data[id] };
//       });
//       setChatrooms(formattedData);
//       console.log(formattedData);
//     });
//   }, [currentUser, isLoading, router]);

//   const handleCreateRoom = async (
//     event: React.MouseEvent<HTMLButtonElement>
//   ) => {
//     event.preventDefault();
//     if (!currentUser) {
//       return;
//     }
//     const db = getDatabase();
//     const chatRef = ref(db, 'chats/');
//     const userChatRef = ref(db, 'user-chats/' + currentUser.uid);
//     try {
//       // Use set() instead of push() if you want to limit user to only one chatroom.
//       const newChildRef = push(chatRef, {
//         userId: currentUser.uid,
//       }).key;

//       console.log(newChildRef);
//       push(userChatRef, {
//         chatId: newChildRef,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className='flex justify-center align-center'>
//       <div className='flex flex-col text-3xl w-1/2 text-center'>
//         <h1>User Name&apos;s dashboard</h1>
//         <div className='flex flex-col'>
//           {chatrooms &&
//             chatrooms.map((chatroom) => (
//               <div key={chatroom.id} className='p-2 mb-3'>
//                 <Link href={`/chat/${chatroom.chatId}`}>{chatroom.chatId}</Link>
//                 <hr />
//               </div>
//             ))}
//         </div>
//         <div>
//           <Button onClick={handleCreateRoom}>Create new room</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import type { NextPage } from 'next';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import UserRooms from '../components/profile/user-rooms';
import UserProfile from '../components/profile/user-profile';
import Button from '../components/ui/button';

import AuthContext from '../store/auth-context';

const Dashboard: NextPage = () => {
  const { isLoading, currentUser, signout } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!currentUser && !isLoading) {
      router.push('/');
    }
  }, [currentUser, isLoading, router]);

  if (isLoading || !currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex justify-center align-center'>
      <div className='flex flex-col w-1/2 text-center'>
        <UserProfile />
        <Button onClick={signout}>signout</Button>
        <div className='p-5' />
        <hr />
        <UserRooms />
      </div>
    </div>
  );
};

export default Dashboard;
