import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { mockUsers } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  RotateCcw,
  MessageSquare,
  Users,
  MoreVertical,
  Maximize2,
  Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoCall() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnecting, setIsConnecting] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const user = mockUsers.find(u => u.id === id);

  useEffect(() => {
    const connectTimer = setTimeout(() => {
      setIsConnecting(false);
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    if (!isConnecting) {
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isConnecting]);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          console.log('Camera access denied or not available');
        });
    }
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setLocation('/chat');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-500">Utilisateur introuvable</p>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-black relative overflow-hidden"
      onClick={() => setShowControls(prev => !prev)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black">
        {isConnecting ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
              className="relative"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full"
              />
              <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-20" />
            </motion.div>
            <h2 className="mt-6 text-2xl font-bold text-white font-display">{user.name}</h2>
            <p className="mt-2 text-zinc-400">Connexion en cours...</p>
            <div className="mt-4 flex gap-1">
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full flex items-center justify-center"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover opacity-30"
            />
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showControls && !isConnecting && (
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 glass border-b border-white/5 p-4 z-10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="font-semibold text-white font-display flex items-center gap-2">
                    {user.name}
                    <Shield className="w-3.5 h-3.5 text-accent" />
                  </h2>
                  <p className="text-sm text-green-400">{formatDuration(callDuration)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  data-testid="button-fullscreen"
                  className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button
                  data-testid="button-call-options"
                  className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-28 right-4 w-32 h-44 sm:w-40 sm:h-56 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl"
      >
        {!isVideoOff ? (
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover mirror"
            style={{ transform: 'scaleX(-1)' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-800">
            <VideoOff className="w-8 h-8 text-zinc-600" />
          </div>
        )}
        <button
          data-testid="button-switch-camera"
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </motion.div>

      <AnimatePresence>
        {showControls && (
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-0 left-0 right-0 glass border-t border-white/5 p-6 z-10"
          >
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                data-testid="button-mute"
                className={cn(
                  "p-4 rounded-full transition-all",
                  isMuted
                    ? "bg-white text-black"
                    : "bg-zinc-800 text-white hover:bg-zinc-700"
                )}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); setIsVideoOff(!isVideoOff); }}
                data-testid="button-video-toggle"
                className={cn(
                  "p-4 rounded-full transition-all",
                  isVideoOff
                    ? "bg-white text-black"
                    : "bg-zinc-800 text-white hover:bg-zinc-700"
                )}
              >
                {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleEndCall(); }}
                data-testid="button-end-call"
                className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all glow-red"
              >
                <PhoneOff className="w-6 h-6" />
              </button>

              <button
                data-testid="button-chat"
                className="p-4 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-all"
              >
                <MessageSquare className="w-6 h-6" />
              </button>

              <button
                data-testid="button-participants"
                className="p-4 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-all"
              >
                <Users className="w-6 h-6" />
              </button>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
}
