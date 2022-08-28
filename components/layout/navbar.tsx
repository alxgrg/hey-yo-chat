import React, { useContext, useState, useEffect, useRef } from 'react';
import AuthContext from '../../store/auth-context';
import { useRouter } from 'next/router';

import type { NextPage } from 'next';

import Link from 'next/link';
import Button from '../ui/button';
import Image from 'next/image';

const Navbar: NextPage = () => {
  const { isLoading, currentUser, signout } = useContext(AuthContext);
  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleOutsideClicks = ({ target }: MouseEvent) => {
      const btn = document.getElementById('dropdownButton');
      if (
        showDropdown &&
        dropdownRef.current &&
        !dropdownRef.current?.contains(target as Node)
      ) {
        // If target is dropdown button dont fire event imperitively as it conflicts with onClick
        if ((target as HTMLButtonElement).id !== 'dropdown-button') {
          setShowDropdown(false);
        }
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleOutsideClicks);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleOutsideClicks);
    };
  }, [showDropdown]);

  return (
    <nav className='w-full bg-gray-800 border-gray-700 border-b p-2 '>
      <div className='flex justify-between text-pink-400 items-center'>
        <div className='flex'>
          <Link href='/'>
            <a>
              {/* <h1 className='text-3xl'>Hey, Yo!</h1> */}
              <Image alt='logo' src='/logo.svg' width={90} height={40} />
            </a>
          </Link>
        </div>
        <div>
          {currentUser && currentUser.displayName ? (
            <>
              <button
                id='dropdown-button'
                onClick={() => setShowDropdown((prevState) => !prevState)}
              >
                {currentUser.displayName}
              </button>
              {showDropdown && (
                <ul
                  className='absolute p-4 border bg-gray-800 border-gray-700 rounded-md right-0 mt-3 shadow'
                  ref={dropdownRef}
                >
                  <li onClick={() => setShowDropdown(false)}>
                    <Link href='/profile'>Profile</Link>
                  </li>
                  <li onClick={() => setShowDropdown(false)}>
                    <Link href='/dashboard'>Dashboard</Link>
                  </li>
                  <li onClick={() => setShowDropdown(false)}>
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
