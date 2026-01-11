import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Send, Image, Smile, Mic, Paperclip } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
      inputRef.current?.focus();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass border-t border-white/5 p-3"
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            data-testid="button-attach"
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <button
            type="button"
            data-testid="button-image"
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Image className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez un message..."
            disabled={disabled}
            data-testid="input-message"
            className={cn(
              "w-full px-4 py-2.5 rounded-full",
              "bg-zinc-900 border border-zinc-800",
              "text-white placeholder:text-zinc-500",
              "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
              "transition-all duration-200"
            )}
          />
          <button
            type="button"
            data-testid="button-emoji"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
          >
            <Smile className="w-5 h-5" />
          </button>
        </div>

        {message.trim() ? (
          <button
            type="submit"
            disabled={disabled}
            data-testid="button-send"
            className={cn(
              "p-3 rounded-full transition-all duration-200",
              "bg-primary text-white glow-red",
              "hover:scale-105 active:scale-95",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            data-testid="button-voice"
            className="p-3 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
          >
            <Mic className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
}
