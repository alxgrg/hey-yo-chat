import { createContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  getAuth,
  signOut,
} from 'firebase/auth';
import { getFirebaseApp } from '../firebaseConfig';

import type { User } from 'firebase/auth';

interface AuthContextProps {
  currentUser: User | null;
  isLoading: boolean;
  signin: (email: string, password: string) => Promise<UserCredential>;
  signout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<UserCredential>;
}

const AuthContext = createContext({} as AuthContextProps);

interface Props {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const app = getFirebaseApp();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        console.log('user is null');
        setCurrentUser(null);
      }
      setIsLoading(false);
      return () => {
        unsubscribe();
      };
    });
  }, [auth, currentUser]);
  const signin = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signout = () => {
    return signOut(auth);
  };
  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const value: AuthContextProps = {
    currentUser,
    isLoading,
    signin,
    signout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

// import { createContext, useState, useEffect } from 'react';
// import {
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   UserCredential,
//   getAuth,
//   signOut,
// } from 'firebase/auth';
// import { getFirebaseApp } from '../firebaseConfig';

// import type { User } from 'firebase/auth';

// interface AuthContextProps {
//   user: User | null;
//   signin: (email: string, password: string) => Promise<User | null>;
//   signout: () => Promise<void>;
//   signup: (email: string, password: string) => Promise<User | null>;
// }

// const AuthContext = createContext({} as AuthContextProps);

// interface Props {
//   children: React.ReactNode;
// }

// export const AuthContextProvider: React.FC<Props> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//   const app = getFirebaseApp();
//   const auth = getAuth(app);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         console.log(user.email);
//         setUser(user);
//       } else {
//         console.log(user);
//         console.log('not logged in');
//       }
//     });
//   }, [auth]);

//   const signin = async (email: string, password: string) => {
//     try {
//       const currentUser = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       setUser(currentUser.user);
//     } catch (error: Error | any) {
//       setError(error);
//       // Maybe return undefined and add type to AuthContextProps
//     }
//     return user;
//   };
//   const signout = () => {
//     return signOut(auth);
//   };

//   const signup = async (email: string, password: string) => {
//     try {
//       const currentUser = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       setUser(currentUser.user);
//     } catch (error: Error | any) {
//       setError(error);
//       // Maybe return undefined and add type to AuthContextProps
//     }
//     return user;
//   };

//   const value: AuthContextProps = {
//     user,
//     signin,
//     signout,
//     signup,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export default AuthContext;
