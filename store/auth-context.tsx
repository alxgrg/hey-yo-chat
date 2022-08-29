import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  updateProfile,
  deleteUser,
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
  signup: (email: string, password: string, username: string) => Promise<void>;
  updateDisplayName: (displayName: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
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
  const router = useRouter();

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
    router.push('/');
    return signOut(auth);
  };
  // const signup = (email: string, password: string) => {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // };

  const signup = async (email: string, password: string, username: string) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user.user, {
        displayName: username,
      });
      setCurrentUser({ ...user.user, displayName: username });
    } catch (error) {
      console.log(error);
    }
  };

  const updateDisplayName = async (newDisplayName: string) => {
    if (currentUser) {
      try {
        const res = await updateProfile(currentUser, {
          displayName: newDisplayName,
        });
        setCurrentUser({ ...currentUser, displayName: newDisplayName });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteAccount = async () => {
    if (currentUser) {
      try {
        await deleteUser(currentUser);
        setCurrentUser(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const value: AuthContextProps = {
    currentUser,
    isLoading,
    signin,
    signout,
    signup,
    updateDisplayName,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
