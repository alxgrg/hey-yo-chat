import { useContext, useState } from 'react';

import { getAuth } from 'firebase/auth';

import AuthContext from '../../store/auth-context';
import Input from '../ui/input';
import Button from '../ui/button';

const UserProfile = () => {
  const [name, setName] = useState('');
  const { isLoading, currentUser, signout, updateDisplayName, deleteAccount } =
    useContext(AuthContext);

  const auth = getAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser || !auth.currentUser) {
      return;
    }
    updateDisplayName(name);
  };

  const handleDeleteAccount = async () => {
    deleteAccount();
  };

  return (
    <div className='flex flex-col gap-4 align-center'>
      <h1 className='text-3xl'>
        {currentUser && currentUser.displayName}&apos;s Profile
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='flex items-end'>
          <div className='mr-3'>
            <label htmlFor='username'>Change username</label>
            <Input
              type='text'
              name='username'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <Button>Save</Button>
          </div>
        </div>
      </form>
      <div className='flex'>
        <Button onClick={signout}>Sign out</Button>
        <div className='p-2' />
        <Button color='bg-red-600' onClick={handleDeleteAccount}>
          Delete account
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
