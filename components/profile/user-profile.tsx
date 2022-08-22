import { useContext, useEffect, useState } from 'react';

import { reload, getAuth } from 'firebase/auth';
import { onValue } from 'firebase/database';

import AuthContext from '../../store/auth-context';
import Input from '../ui/input';
import Button from '../ui/button';

const UserProfile = () => {
  const [name, setName] = useState('');
  const { isLoading, currentUser, signout, updateDisplayName } =
    useContext(AuthContext);

  const auth = getAuth();

  // useEffect(() => {
  //   return onValue(chatRoomsRef, (snapshot) => {
  //     const data = snapshot.val();
  //     // If no messages in db, nope out.
  //     if (!data) {
  //       return;
  //     }
  //     const formattedData = Object.keys(data).map((id) => {
  //       return { id: id, ...data[id] };
  //     });
  //     setChatrooms(formattedData);
  //     console.log(formattedData);
  //   });
  // },[])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser || !auth.currentUser) {
      return;
    }

    updateDisplayName(name);

    // updateProfile(currentUser, { displayName: name })
    //   .then(() =>
    //     console.log('successfully updated profile', currentUser.displayName)
    //   )
    //   .catch((error) => console.log('error updating profile'));
  };

  return (
    <div>
      <h1>{currentUser && currentUser.displayName}'s Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type='text'
            name='username'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <Button>Change username</Button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
