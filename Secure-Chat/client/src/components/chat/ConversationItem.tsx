import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";
import type { Conversation } from "@/lib/mockData";
import { formatTime } from "@/lib/mockData";

interface ConversationItemProps {
  conversation: Conversation;
  isActive?: boolean;
  onClick?: () => void;
}

export function ConversationItem({ conversation, isActive, onClick }: ConversationItemProps) {
  const { participant, lastMessage, unreadCount, isTyping } = conversation;

  return (
    <button
      data-testid={`conversation-${conversation.id}`}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
        "hover:bg-white/5 active:scale-[0.98]",
        isActive && "bg-white/10 border border-white/10"
      )}
    >
      <Avatar
        src={participant.avatar}
        alt={participant.name}
        status={participant.status}
        size="md"
      />
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium text-white truncate">
            {participant.name}
          </h3>
          {lastMessage && (
            <span className="text-xs text-zinc-500 flex-shrink-0">
              {formatTime(lastMessage.timestamp)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className={cn(
            "text-sm truncate",
            isTyping ? "text-primary italic" : "text-zinc-400"
          )}>
            {isTyping ? "écrit..." : lastMessage?.content || "Nouvelle conversation"}
          </p>
          {unreadCount > 0 && (
            <span
              data-testid={`unread-count-${conversation.id}`}
              className="flex-shrink-0 min-w-5 h-5 flex items-center justify-center rounded-full bg-primary text-white text-xs font-medium px-1.5"
            >
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
