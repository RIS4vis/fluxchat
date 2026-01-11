import { cn } from "@/lib/utils";
import type { Message } from "@/lib/mockData";
import { Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
  isSent: boolean;
}

export function MessageBubble({ message, isSent }: MessageBubbleProps) {
  const time = message.timestamp.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div
      data-testid={`message-${message.id}`}
      className={cn(
        "flex animate-fade-in",
        isSent ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[75%] px-4 py-2.5 relative group",
          isSent ? "message-bubble-sent" : "message-bubble-received"
        )}
      >
        {message.type === 'image' && message.mediaUrl && (
          <img
            src={message.mediaUrl}
            alt="Image"
            className="rounded-lg mb-2 max-w-full"
          />
        )}
        {message.type === 'video' && message.mediaUrl && (
          <video
            src={message.mediaUrl}
            controls
            className="rounded-lg mb-2 max-w-full"
          />
        )}
        <p className={cn(
          "text-sm leading-relaxed",
          isSent ? "text-white" : "text-zinc-100"
        )}>
          {message.content}
        </p>
        <div className={cn(
          "flex items-center gap-1 mt-1",
          isSent ? "justify-end" : "justify-start"
        )}>
          <span className={cn(
            "text-[10px]",
            isSent ? "text-white/60" : "text-zinc-500"
          )}>
            {time}
          </span>
          {isSent && (
            message.read ? (
              <CheckCheck className="w-3.5 h-3.5 text-white/60" />
            ) : (
              <Check className="w-3.5 h-3.5 text-white/40" />
            )
          )}
        </div>
      </div>
    </div>
  );
}
