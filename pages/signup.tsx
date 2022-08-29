import type { NextPage } from 'next';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import AuthContext from '../store/auth-context';
import SignupForm from '../components/auth/signup-form';
import Head from 'next/head';

const Signup: NextPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const authCtx = useContext(AuthContext);

  const router = useRouter();

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      const user = await authCtx.signup(email, password, username);
      // console.log('user', authCtx.currentUser);
      setEmail('');
      setPassword('');
      setUsername('');
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center text-white h-[calc(100vh-63px)] gap-5'>
      <Head>
        <title>Sign up for Hey Yo!</title>
      </Head>
      <h1 className='text-3xl text-pink-400'>Signup</h1>
      <SignupForm
        onSignup={handleSignup}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onChangeConfirmPassword={onChangeConfirmPassword}
        onChangeUsername={onChangeUsername}
        emailValue={email}
        passwordValue={password}
        confirmPasswordValue={confirmPassword}
        usernameValue={username}
      />
    </div>
  );
};

export default Signup;
