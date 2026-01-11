import { useState } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { mockConversations, currentUser } from "@/lib/mockData";
import { ConversationItem } from "@/components/chat/ConversationItem";
import { Avatar } from "@/components/chat/Avatar";
import { 
  Search, 
  Plus, 
  Settings, 
  Bell, 
  MessageCircle,
  Users,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";

export default function ChatList() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'groups'>('all');

  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || (activeTab === 'unread' && conv.unreadCount > 0);
    return matchesSearch && matchesTab;
  });

  const totalUnread = mockConversations.reduce((acc, conv) => acc + conv.unreadCount, 0);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="glass border-b border-white/5 px-4 py-4 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar
              src={currentUser.avatar}
              alt={currentUser.name}
              status={currentUser.status}
              size="md"
            />
            <div>
              <h1 className="text-xl font-bold text-white font-display">Messages</h1>
              <p className="text-xs text-zinc-500 flex items-center gap-1">
                <Shield className="w-3 h-3 text-accent" />
                Chiffrement activé
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              data-testid="button-notifications"
              className="relative p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {totalUnread > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              )}
            </button>
            <button
              data-testid="button-settings"
              className="p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une conversation..."
            data-testid="input-search"
            className={cn(
              "w-full pl-12 pr-4 py-3 rounded-xl",
              "bg-zinc-900/80 border border-zinc-800",
              "text-white placeholder:text-zinc-500",
              "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
              "transition-all duration-200"
            )}
          />
        </div>

        <div className="flex gap-2 mt-4">
          {[
            { id: 'all', label: 'Tous', icon: MessageCircle },
            { id: 'unread', label: 'Non lus', icon: Bell, count: totalUnread },
            { id: 'groups', label: 'Groupes', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              data-testid={`tab-${tab.id}`}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-white/20 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-auto scrollbar-hide px-2 py-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-1"
        >
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation, index) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ConversationItem
                  conversation={conversation}
                  onClick={() => setLocation(`/chat/${conversation.id}`)}
                />
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-zinc-600" />
              </div>
              <p className="text-zinc-500">Aucune conversation trouvée</p>
            </div>
          )}
        </motion.div>
      </main>

      <button
        data-testid="button-new-chat"
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full",
          "bg-gradient-to-r from-primary to-primary/90",
          "flex items-center justify-center",
          "shadow-lg glow-red",
          "hover:scale-105 active:scale-95 transition-transform"
        )}
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
