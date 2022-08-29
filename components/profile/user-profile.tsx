import { useContext, useState } from 'react';

import { getAuth } from 'firebase/auth';

import AuthContext from '../../store/auth-context';
import ModalContext from '../../store/modal-context';

import Input from '../ui/input';
import Button from '../ui/button';
import Modal from '../ui/modal';

const UserProfile = () => {
  const [name, setName] = useState('');
  const { isLoading, currentUser, signout, updateDisplayName, deleteAccount } =
    useContext(AuthContext);

  const modalCtx = useContext(ModalContext);

  const auth = getAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser || !auth.currentUser) {
      return;
    }
    updateDisplayName(name);
  };

  const handleDeleteAccount = async () => {
    deleteAccount();
  };

  return (
    <div className='flex flex-col gap-5 items-center mt-8 w-full'>
      <h1 className='text-3xl text-pink-400 text-center'>
        {currentUser && currentUser.displayName}&apos;s Profile
      </h1>
      <form onSubmit={handleSubmit} className='w-full'>
        <div className='flex items-end text-white justify-center'>
          <div className='w-full max-w-xl px-4'>
            <Input
              type='text'
              name='username'
              onChange={(e) => setName(e.target.value)}
              value={name}
              buttonContent='Save'
              placeholder='Change username'
            />
          </div>
        </div>
      </form>
      <div className='flex'>
        <Button onClick={signout}>Sign out</Button>
        <div className='p-2' />
        <Button
          color='bg-red-600'
          onClick={() => modalCtx.showModal(currentUser?.uid)}
        >
          Delete account
        </Button>
      </div>
      {modalCtx.modal && modalCtx.modal.id === currentUser?.uid && (
        <Modal>
          <div className='flex flex-col gap-4'>
            <h1 className='text-xl'>
              Are you sure you want to delete your account?
            </h1>
            <Button color='bg-red-600' onClick={handleDeleteAccount}>
              Delete account
            </Button>
            <Button onClick={modalCtx.hideModal}>Cancel</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserProfile;
