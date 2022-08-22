import type { NextPage } from 'next';
import { useContext } from 'react';

import AuthContext from '../store/auth-context';

import Button from '../components/ui/button';
import Link from 'next/link';

const Home: NextPage = () => {
  const { currentUser, isLoading } = useContext(AuthContext);

  return (
    // <div className='w-1/3'>
    //   {!isLoading && (
    //     <h1>Welcome {currentUser ? 'back ' + currentUser.email : 'dude!'}!</h1>
    //   )}
    // </div>
    <div className='bg-slate-600 h-[calc(100vh-60px)] flex flex-col items-center'>
      <div className='text-white mt-12 text-center'>
        <h1 className='text-3xl text-pink-400'>Hey, Yo!</h1>
        <p>Create room. Share room. Chat room. </p>

        <div className='flex items-center mt-3'>
          <div className=''>
            <Button href='/signin'>Sign in</Button>
          </div>
          <div className='p-1' />
          <p>
            Or{' '}
            <Link href='/signup'>
              <a className='text-pink-400'>create an account</a>
            </Link>{' '}
            to get started
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
