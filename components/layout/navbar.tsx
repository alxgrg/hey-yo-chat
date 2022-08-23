import { useContext, useEffect } from 'react';
import AuthContext from '../../store/auth-context';
import { useRouter } from 'next/router';

import type { NextPage } from 'next';

import Link from 'next/link';
import Button from '../ui/button';

const Navbar: NextPage = () => {
  const { isLoading, currentUser, signout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <nav className='w-full bg-black p-3 top-0'>
      <div className='flex justify-between text-pink-400 align-middle'>
        <div className='flex'>
          <Link href='/'>
            <a>
              <h1 className='text-3xl'>Hey, Yo!</h1>
            </a>
          </Link>
        </div>
        <div>
          {currentUser && currentUser.displayName ? (
            <Link href='/dashboard'>{currentUser.displayName}</Link>
          ) : (
            <Button href='signin'>Sign in</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
