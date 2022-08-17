import type { NextPage } from 'next';
import { useContext } from 'react';

import AuthContext from '../store/auth-context';

const Home: NextPage = () => {
  const { currentUser, isLoading } = useContext(AuthContext);

  return (
    <div className='w-1/3'>
      {!isLoading && (
        <h1>Welcome {currentUser ? 'back ' + currentUser.email : 'dude!'}!</h1>
      )}
    </div>
  );
};

export default Home;
