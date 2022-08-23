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
    <div>
      <h1 className='text-3xl'>
        {currentUser && currentUser.displayName}&apos;s Profile
      </h1>
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
      <div>
        <Button color='bg-red-600' onClick={handleDeleteAccount}>
          Delete account
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
