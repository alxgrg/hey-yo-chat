import type { NextPage } from 'next';
import React, { useState, useContext } from 'react';

import AuthContext from '../store/auth-context';
import SignupForm from '../components/auth/signup-form';

const Signup: NextPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const authCtx = useContext(AuthContext);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center gap-4 text-gray-200'>
      <h1 className='text-3xl text-pink-400'>Signup</h1>
      <SignupForm
        onSignup={handleSignup}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onChangeUsername={onChangeUsername}
        emailValue={email}
        passwordValue={password}
        usernameValue={username}
      />
    </div>
  );
};

export default Signup;
