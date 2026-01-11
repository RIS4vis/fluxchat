import { Avatar } from "./Avatar";
import type { User } from "@/lib/mockData";
import { formatLastSeen } from "@/lib/mockData";
import { ArrowLeft, Phone, Video, MoreVertical, Shield } from "lucide-react";
import { useLocation } from "wouter";

interface ChatHeaderProps {
  user: User;
  onVideoCall?: () => void;
  onVoiceCall?: () => void;
}

export function ChatHeader({ user, onVideoCall, onVoiceCall }: ChatHeaderProps) {
  const [, setLocation] = useLocation();

  return (
    <header className="glass border-b border-white/5 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocation('/chat')}
            data-testid="button-back"
            className="p-2 -ml-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors md:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Avatar
            src={user.avatar}
            alt={user.name}
            status={user.status}
            size="md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-white font-display">{user.name}</h2>
              <Shield className="w-3.5 h-3.5 text-accent" data-testid="icon-encrypted" />
            </div>
            <p className="text-sm text-zinc-400">
              {user.status === 'online' ? (
                <span className="text-green-400">En ligne</span>
              ) : (
                formatLastSeen(user.lastSeen)
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onVoiceCall}
            data-testid="button-voice-call"
            className="p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            onClick={onVideoCall}
            data-testid="button-video-call"
            className="p-2.5 rounded-full text-zinc-400 hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <Video className="w-5 h-5" />
          </button>
          <button
            data-testid="button-more"
            className="p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
