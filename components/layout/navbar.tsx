import { useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { useRouter } from 'next/router';

import type { NextPage } from 'next';

import Link from 'next/link';
import Button from '../ui/button';

const Navbar: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, currentUser, signout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <nav className='w-full bg-black p-3 top-0'>
      <div className='flex justify-between text-pink-400 items-center'>
        <div className='flex'>
          <Link href='/'>
            <a>
              <h1 className='text-3xl'>Hey, Yo!</h1>
            </a>
          </Link>
        </div>
        <div>
          {currentUser && currentUser.displayName ? (
            <>
              <div
                onClick={() => {
                  setIsOpen((prevState) => !prevState);
                }}
                className='cursor-pointer'
              >
                {currentUser.displayName}
              </div>
              {isOpen && (
                <ul className='absolute p-4 bg-black rounded-md right-0 mt-3 border'>
                  <li>
                    <Link href='/profile'>Profile</Link>
                  </li>
                  <li>
                    <Link href='/dashboard'>Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={signout}>Sign out</button>
                  </li>
                </ul>
              )}
            </>
          ) : (
            <Button href='signin'>Sign in</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
