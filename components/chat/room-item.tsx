import { useContext } from 'react';
import Button from '../ui/button';
import Link from 'next/link';
import Modal from '../ui/modal';

import ModalContext from '../../store/modal-context';

import type { ChatRoom } from '../../types';

const RoomItem = ({
  chatroom,
  onDelete,
}: {
  chatroom: ChatRoom;
  onDelete: (chatId: string, userChatId: string) => void;
}) => {
  const modalCtx = useContext(ModalContext);

  return (
    <>
      <div
        key={chatroom.id}
        className='p-4 mb-3 shadow-2xl text-pink-400 bg-gray-700 rounded-md flex justify-between relative'
      >
        <div className='mr-3 font-bold'>
          <Link href={`/chat/${chatroom.chatId}`}>{chatroom.chatName}</Link>
        </div>
        <div className='p-2' />

        <div className='absolute right-0 top-0 text-red-500 p-2'>
          <button
            className=''
            // onClick={() => handleDeleteRoom(chatroom.chatId, chatroom.id)}
            onClick={() => modalCtx.showModal(chatroom.id)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-x-circle'
            >
              <circle cx='12' cy='12' r='10'></circle>
              <line x1='15' y1='9' x2='9' y2='15'></line>
              <line x1='9' y1='9' x2='15' y2='15'></line>
            </svg>
          </button>
        </div>
      </div>
      {modalCtx.modal && modalCtx.modal.id === chatroom.id && (
        <Modal>
          <div className='flex flex-col gap-4'>
            <h1 className='text-xl'>
              Are you sure you want to delete{' '}
              <span className='text-pink-400'>{chatroom.chatName}</span>
            </h1>
            <Button
              color='bg-red-500'
              onClick={() => onDelete(chatroom.chatId, chatroom.id)}
            >
              Delete room
            </Button>
            <Button onClick={modalCtx.hideModal}>Cancel</Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RoomItem;
