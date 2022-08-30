// import { useEffect, useState, useContext } from 'react';
// import { useRouter } from 'next/router';
// import { ChatMember } from '../../types';
// import AuthContext from '../../store/auth-context';
// import {
//   ref,
//   push,
//   onValue,
//   getDatabase,
//   get,
//   remove,
// } from 'firebase/database';

// const ChatMembers = () => {
//   const [members, setMembers] = useState<ChatMember[]>([]);

//   const { isLoading, currentUser, signout } = useContext(AuthContext);

//   const router = useRouter();

//   useEffect(() => {
//     const db = getDatabase();
//     const chatMembersRef = ref(db, 'chat_members/' + router.query.id);

//     // Get chat members
//     let isMember = [];

//     const chatMembers = () => {
//       get(chatMembersRef).then((snapshot) => {
//         const data = snapshot.val();

//         if (data) {
//           const formattedData = Object.keys(data).map((id) => data[id]);

//           isMember = formattedData.filter(
//             (member) => member.userId === currentUser?.uid
//           );
//           console.log('isMember', isMember);
//         }

//         if (isMember.length === 0) {
//           try {
//             push(chatMembersRef, {
//               userId: currentUser?.uid,
//               chatId: router.query.id,
//               username: currentUser?.displayName,
//               online: true,
//             });
//           } catch (error) {
//             console.log(error);
//           }
//         }
//       });
//     };

//     chatMembers();

//     return onValue(chatMembersRef, (snapshot) => {
//       const data = snapshot.val();
//       // If no messages in db, nope out.
//       // if (!data) {
//       //   router.push('/');
//       //   return;
//       // }

//       const formattedData = Object.keys(data).map((id, i) => {
//         return { id: id, ...data[id] };
//       });

//       //  Set message limit
//       const membersLimit = 100;

//       setMembers(formattedData);
//     });
//   }, [currentUser?.displayName, currentUser?.uid, router]);

//   return (
//     <div className='pb-2 sm:flex flex-col h-full overflow-hidden hidden w-1/4'>
//       <div className='p-2 bg-gray-700 border rounded border-gray-600 flex flex-col h-full overflow-hidden w-full text-pink-400 font-bold'>
//         {members &&
//           members.map((member) => <div key={member.id}>{member.username}</div>)}
//       </div>
//     </div>
//   );
// };

// export default ChatMembers;

import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { ChatMember } from '../../types';
import AuthContext from '../../store/auth-context';
import {
  ref,
  push,
  onValue,
  getDatabase,
  get,
  set,
  remove,
  onDisconnect,
} from 'firebase/database';

const ChatMembers = () => {
  const [members, setMembers] = useState<ChatMember[]>([]);

  const { isLoading, currentUser, signout } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const db = getDatabase();
    // Fetch the current user's ID from Firebase Authentication.
    const uid = currentUser?.uid;

    // Create a reference to this user's specific status node.
    // This is where we will store data about being online/offline.

    // const userStatusDatabaseRef = ref(db, '/status/' + uid);

    const userStatusDatabaseRef = ref(
      db,
      '/chat_members/' + router.query.id + '/' + uid
    );

    // We'll create two constants which we will write to
    // the Realtime database when this device is offline
    // or online.
    const isOfflineForDatabase = {
      username: currentUser?.displayName,
      state: 'offline',
      last_changed: Date.now(),
    };

    const isOnlineForDatabase = {
      username: currentUser?.displayName,
      state: 'online',
      last_changed: Date.now(),
    };

    const membersRef = ref(db, '/chat_members/' + router.query.id);

    const membersUnsubscribe = onValue(membersRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        return;
      }

      const formattedData = Object.keys(data).map((id) => {
        return { id: id, ...data[id] };
      });
      setMembers(formattedData);
      console.log(formattedData);
    });

    // Create a reference to the special '.info/connected' path in
    // Realtime Database. This path returns `true` when connected
    // and `false` when disconnected.
    const connectedRef = ref(db, '.info/connected');

    const unsubscribe = onValue(connectedRef, (snapshot) => {
      // If we're not currently connected, don't do anything.
      if (snapshot.val() == false) {
        return;
      }

      onDisconnect(userStatusDatabaseRef)
        .set(null)
        .then(function () {
          // The promise returned from .onDisconnect().set() will
          // resolve as soon as the server acknowledges the onDisconnect()
          // request, NOT once we've actually disconnected

          set(userStatusDatabaseRef, isOnlineForDatabase);
        });
    });

    // If user navigates away remove from members list
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      remove(userStatusDatabaseRef);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      unsubscribe();
      membersUnsubscribe();
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [
    currentUser,
    currentUser?.displayName,
    currentUser?.uid,
    router.events,
    router.query.id,
  ]);

  return (
    <div className='pb-2 sm:flex flex-col h-full overflow-hidden hidden min-w-min w-1/4'>
      <div className='p-2 bg-gray-700 border rounded border-gray-600 flex flex-col h-full overflow-hidden w-full text-pink-400 font-bold'>
        <h2 className='text-gray-400 text-bold text-sm'>ONLINE</h2>
        {members &&
          members.map((member) => {
            if (member.id !== currentUser?.uid) {
              return <div key={member.id}>{member.username}</div>;
            }
            return (
              <div key={member.id} className='text-blue-400'>
                <b>{member.username}</b>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ChatMembers;
