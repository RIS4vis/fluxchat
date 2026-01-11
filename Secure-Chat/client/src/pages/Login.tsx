import { useState } from "react";
import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Mail, Lock, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLocation('/chat');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,0,80,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,197,66,0.1),transparent_50%)]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 mb-6 glow-red"
          >
            <MessageCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white font-display mb-2">
            Flux<span className="text-primary">Chat</span>
          </h1>
          <p className="text-zinc-400">
            Messagerie sécurisée et moderne
          </p>
        </div>

        <div className="glass rounded-3xl border border-white/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-zinc-300 mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  data-testid="input-email"
                  className={cn(
                    "w-full pl-12 pr-4 py-3.5 rounded-xl",
                    "bg-zinc-900/80 border border-zinc-800",
                    "text-white placeholder:text-zinc-500",
                    "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                    "transition-all duration-200"
                  )}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-300 mb-2 block">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  data-testid="input-password"
                  className={cn(
                    "w-full pl-12 pr-12 py-3.5 rounded-xl",
                    "bg-zinc-900/80 border border-zinc-800",
                    "text-white placeholder:text-zinc-500",
                    "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                    "transition-all duration-200"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  data-testid="button-toggle-password"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  data-testid="checkbox-remember"
                  className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-primary focus:ring-primary/20"
                />
                <span className="text-zinc-400">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              data-testid="button-login"
              className={cn(
                "w-full py-4 rounded-xl font-semibold text-white",
                "bg-gradient-to-r from-primary to-primary/90",
                "hover:from-primary/90 hover:to-primary/80",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                "transition-all duration-300 glow-red",
                "flex items-center justify-center gap-2",
                isLoading && "opacity-70 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Se connecter</span>
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-center text-zinc-400 text-sm">
              Pas encore de compte ?{" "}
              <Link href="/signup" className="text-accent hover:text-accent/80 font-medium transition-colors">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          Chiffrement de bout en bout • WebRTC sécurisé
        </p>
      </motion.div>
    </div>
  );
}
