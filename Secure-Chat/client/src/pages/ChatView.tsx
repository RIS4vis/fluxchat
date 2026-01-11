import { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { mockConversations, currentUser, type Message } from "@/lib/mockData";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatInput } from "@/components/chat/ChatInput";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { motion } from "framer-motion";

export default function ChatView() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = mockConversations.find(c => c.id === id);

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
      setIsTyping(conversation.isTyping || false);
    }
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!conversation) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-500">Conversation introuvable</p>
      </div>
    );
  }

  const handleSend = (content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      content,
      timestamp: new Date(),
      type: 'text',
      read: false
    };
    setMessages(prev => [...prev, newMessage]);

    setTimeout(() => {
      setIsTyping(true);
    }, 500);

    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: `msg-${Date.now() + 1}`,
        senderId: conversation.participant.id,
        content: getRandomReply(),
        timestamp: new Date(),
        type: 'text',
        read: true
      };
      setMessages(prev => [...prev, reply]);
    }, 2000 + Math.random() * 2000);
  };

  const handleVideoCall = () => {
    setLocation(`/call/${conversation.participant.id}`);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <ChatHeader
        user={conversation.participant}
        onVideoCall={handleVideoCall}
      />

      <main className="flex-1 overflow-auto scrollbar-hide p-4">
        <div className="max-w-3xl mx-auto space-y-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-4"
          >
            <p className="text-xs text-zinc-600 bg-zinc-900/50 inline-block px-3 py-1.5 rounded-full">
              🔒 Messages chiffrés de bout en bout
            </p>
          </motion.div>

          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
            >
              <MessageBubble
                message={message}
                isSent={message.senderId === currentUser.id}
              />
            </motion.div>
          ))}

          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      <ChatInput onSend={handleSend} />
    </div>
  );
}

const replies = [
  "Super ! 🎉",
  "Je suis d'accord avec toi",
  "Ça a l'air génial !",
  "On en reparle bientôt ?",
  "Parfait, merci !",
  "👍",
  "Excellent choix !",
  "Je comprends 😊",
  "C'est noté !",
  "On fait comme ça alors"
];

function getRandomReply(): string {
  return replies[Math.floor(Math.random() * replies.length)];
}
