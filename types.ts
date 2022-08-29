export type ChatRoom = { id: string; chatId: string; chatName: string };

export type ChatMessage = {
  id: string;
  chatId: string;
  username: string;
  userId: string;
  message: string;
};

export type ChatMember = {
  id: string;
  userId: string;
  username: string;
  online: boolean;
};
