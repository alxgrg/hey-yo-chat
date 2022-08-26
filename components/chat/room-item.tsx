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
        className='p-4 mb-3 shadow-2xl text-white relative bg-slate-600 rounded-md'
      >
        <Link href={`/chat/${chatroom.chatId}`}>{chatroom.chatName}</Link>
        <button
          className='absolute right-2 top-0 rounded text-red-400'
          // onClick={() => handleDeleteRoom(chatroom.chatId, chatroom.id)}
          onClick={() => modalCtx.showModal(chatroom.id)}
        >
          x
        </button>
      </div>
      {modalCtx.modal && modalCtx.modal.id === chatroom.id && (
        <Modal>
          <h1>test</h1>
          <Button onClick={() => onDelete(chatroom.chatId, chatroom.id)}>
            Confirm
          </Button>
          <Button onClick={modalCtx.hideModal}>Cancel</Button>
        </Modal>
      )}
    </>
  );
};

export default RoomItem;
