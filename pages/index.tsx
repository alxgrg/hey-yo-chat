import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import AuthContext from '../store/auth-context';

import Button from '../components/ui/button';
import Link from 'next/link';

const Home: NextPage = () => {
  const { isLoading, currentUser, signout } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (currentUser && !isLoading) {
      router.push('/dashboard');
    }
  }, [currentUser, isLoading, router]);

  return (
    <div className='bg-slate-600 h-[calc(100vh-60px)] flex flex-col items-center justify-center'>
      <div className='text-white text-center flex flex-col gap-3 py-8 px-5 mb-8'>
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
