import type { NextPage } from 'next';
import React, { useState, useContext } from 'react';

import AuthContext from '../store/auth-context';
import SignupForm from '../components/auth/signup-form';

const Signup: NextPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const authCtx = useContext(AuthContext);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      const user = await authCtx.signup(email, password);
      console.log(user);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-xl'>Signup</h1>
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
