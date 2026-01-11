import { Link } from "wouter";
import { MessageCircle, Shield, Video, Zap, Lock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,0,80,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,197,66,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,0,80,0.1),transparent_30%)]" />
      
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white font-display">
            Flux<span className="text-primary">Chat</span>
          </span>
        </div>
        <Link href="/login">
          <button
            data-testid="button-header-login"
            className="px-5 py-2.5 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-all border border-white/10"
          >
            Connexion
          </button>
        </Link>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-zinc-300">Nouvelle génération de messagerie</span>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl font-bold text-white font-display leading-tight mb-6">
            Discutez en toute
            <br />
            <span className="relative">
              <span className="text-primary text-glow-red">sécurité</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full origin-left"
              />
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            FluxChat combine le meilleur de TikTok et WhatsApp pour une expérience
            de messagerie <span className="text-accent">chiffrée</span>, moderne et ultra-rapide.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="button-get-started"
                className={cn(
                  "px-8 py-4 rounded-full font-semibold text-white",
                  "bg-gradient-to-r from-primary to-primary/90",
                  "glow-red shadow-lg",
                  "flex items-center gap-2"
                )}
              >
                <Zap className="w-5 h-5" />
                Commencer gratuitement
              </motion.button>
            </Link>
            <Link href="/login">
              <button
                data-testid="button-signin"
                className="px-8 py-4 rounded-full font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-all"
              >
                J'ai déjà un compte
              </button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 max-w-4xl w-full"
        >
          {[
            {
              icon: Lock,
              title: "Chiffrement E2E",
              description: "Vos messages sont chiffrés de bout en bout. Personne ne peut les lire.",
              color: "primary"
            },
            {
              icon: Video,
              title: "Appels vidéo HD",
              description: "Appels vidéo sécurisés via WebRTC avec qualité cristalline.",
              color: "accent"
            },
            {
              icon: Shield,
              title: "Zéro données",
              description: "Aucune donnée personnelle stockée. Votre vie privée d'abord.",
              color: "primary"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className={cn(
                "glass rounded-2xl p-6 border border-white/10",
                "hover:border-white/20 transition-all duration-300",
                "group"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                feature.color === "primary" ? "bg-primary/20" : "bg-accent/20"
              )}>
                <feature.icon className={cn(
                  "w-6 h-6",
                  feature.color === "primary" ? "text-primary" : "text-accent"
                )} />
              </div>
              <h3 className="text-lg font-semibold text-white font-display mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <footer className="relative z-10 text-center py-6 text-zinc-600 text-sm">
        © 2026 FluxChat • Chiffrement de bout en bout
      </footer>
    </div>
  );
}
