// import { NextPage } from 'next';
// import { useRef, createRef } from 'react';

// import Button from '../ui/button';
// import Input from '../ui/input';

// type Props = {
//   onSignup: (email: string, password: string) => void;
// };

// const SignupForm: NextPage<Props> = (props) => {
//   const emailInputRef = useRef<HTMLInputElement>(null);
//   const passwordInputRef = useRef<HTMLInputElement>(null);

//   const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const email = emailInputRef.current?.value;
//     const password = passwordInputRef.current?.value;
//     if (
//       !email ||
//       email.trim().length === 0 ||
//       !password ||
//       password.trim().length === 0
//     ) {
//       return;
//     }

//     props.onSignup(email, password);

//   };

//   return (
//     <form className='flex flex-col' onSubmit={handleSignup}>
//       <div>
//         <div>
//           <label htmlFor='email'>Email</label>
//           <Input type='text' name='email' required ref={emailInputRef} />
//         </div>
//         <div>
//           <label htmlFor='password'>Password</label>
//           <Input
//             type='password'
//             name='password'
//             required
//             ref={passwordInputRef}
//           />
//         </div>
//       </div>

//       <div>
//         <Button>Submit</Button>
//       </div>
//     </form>
//   );
// };

// export default SignupForm;

import type { NextPage } from 'next';
import { useState } from 'react';

import Button from '../ui/button';
import Input from '../ui/input';

type Props = {
  onSignup: (email: string, password: string) => void;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeConfirmPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUsername: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emailValue: string;
  passwordValue: string;
  confirmPasswordValue: string;
  usernameValue: string;
};

const SignupForm: NextPage<Props> = (props) => {
  const [error, setError] = useState<{ message: string } | null>(null);
  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);

    const email = props.emailValue;
    const username = props.usernameValue;
    const password = props.passwordValue;
    const confirmPassword = props.confirmPasswordValue;
    if (
      !email ||
      email.trim().length === 0 ||
      !username ||
      username.trim().length === 0 ||
      !password ||
      password.trim().length === 0 ||
      !confirmPassword ||
      confirmPassword.trim().length === 0
    ) {
      setError({
        message: 'Must enter valid Username, Email and Password',
      });
      return;
    }
    if (password !== confirmPassword) {
      setError({
        message: 'Passwords do not match!',
      });
      return;
    }

    props.onSignup(email, password);
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSignup}>
      <div>
        <Input
          type='text'
          name='username'
          required
          value={props.usernameValue}
          onChange={props.onChangeUsername}
          placeholder='Username'
        />
      </div>
      <div>
        <Input
          type='text'
          name='email'
          required
          value={props.emailValue}
          onChange={props.onChangeEmail}
          placeholder='Email'
        />
      </div>

      <div>
        <Input
          type='password'
          name='password'
          value={props.passwordValue}
          onChange={props.onChangePassword}
          required
          placeholder='Password'
        />
      </div>

      <div>
        <Input
          type='password'
          name='confirm-password'
          value={props.confirmPasswordValue}
          onChange={props.onChangeConfirmPassword}
          required
          placeholder='Confirm password'
        />
      </div>
      {error && <p className='text-red-500'>{error.message}</p>}

      <div>
        <Button>Submit</Button>
      </div>
    </form>
  );
};

export default SignupForm;
