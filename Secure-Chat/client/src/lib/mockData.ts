export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
  bio?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participant: User;
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  isTyping?: boolean;
}

export const currentUser: User = {
  id: 'current',
  name: 'Vous',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current&backgroundColor=ff0050',
  status: 'online',
  bio: 'Disponible'
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sophie&backgroundColor=f5c542',
    status: 'online',
    bio: 'Designer créative ✨'
  },
  {
    id: '2',
    name: 'Lucas Dubois',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucas&backgroundColor=6366f1',
    status: 'online',
    lastSeen: new Date()
  },
  {
    id: '3',
    name: 'Emma Bernard',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma&backgroundColor=ec4899',
    status: 'away',
    lastSeen: new Date(Date.now() - 1800000)
  },
  {
    id: '4',
    name: 'Thomas Petit',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=thomas&backgroundColor=10b981',
    status: 'offline',
    lastSeen: new Date(Date.now() - 7200000)
  },
  {
    id: '5',
    name: 'Chloé Roux',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chloe&backgroundColor=f59e0b',
    status: 'online',
    bio: 'Toujours connectée 🌟'
  },
  {
    id: '6',
    name: 'Antoine Moreau',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=antoine&backgroundColor=8b5cf6',
    status: 'offline',
    lastSeen: new Date(Date.now() - 86400000)
  }
];

const generateMessages = (userId: string): Message[] => {
  const baseMessages: { content: string; fromUser: boolean }[] = [
    { content: "Salut ! Comment ça va ? 👋", fromUser: false },
    { content: "Hey ! Ça va super bien, et toi ?", fromUser: true },
    { content: "Parfait ! Tu as vu le nouveau projet ?", fromUser: false },
    { content: "Oui ! C'est vraiment impressionnant 🔥", fromUser: true },
    { content: "On se fait un call pour en discuter ?", fromUser: false },
  ];
  
  return baseMessages.map((msg, index) => ({
    id: `${userId}-${index}`,
    senderId: msg.fromUser ? 'current' : userId,
    content: msg.content,
    timestamp: new Date(Date.now() - (baseMessages.length - index) * 600000),
    type: 'text' as const,
    read: true
  }));
};

export const mockConversations: Conversation[] = mockUsers.map((user, index) => {
  const messages = generateMessages(user.id);
  return {
    id: `conv-${user.id}`,
    participant: user,
    messages,
    lastMessage: messages[messages.length - 1],
    unreadCount: index < 2 ? Math.floor(Math.random() * 3) : 0,
    isTyping: index === 0
  };
});

export const formatTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "À l'instant";
  if (diffMins < 60) return `${diffMins}min`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}j`;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

export const formatLastSeen = (date?: Date): string => {
  if (!date) return 'Hors ligne';
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 5) return 'En ligne';
  if (diffMins < 60) return `Vu il y a ${diffMins}min`;
  if (diffHours < 24) return `Vu il y a ${diffHours}h`;
  return `Vu ${date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`;
};
