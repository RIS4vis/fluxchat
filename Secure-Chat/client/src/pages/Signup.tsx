import { useState } from "react";
import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Mail, Lock, User, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Signup() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLocation('/chat');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,197,66,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,0,80,0.12),transparent_50%)]" />
      
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
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-accent/80 mb-6 glow-gold"
          >
            <MessageCircle className="w-10 h-10 text-black" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white font-display mb-2">
            Rejoignez <span className="text-accent">FluxChat</span>
          </h1>
          <p className="text-zinc-400">
            Créez votre compte sécurisé
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                s === step ? "w-8 bg-accent" : "w-4 bg-zinc-800"
              )}
            />
          ))}
        </div>

        <div className="glass rounded-3xl border border-white/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-5"
              >
                <div>
                  <label className="text-sm font-medium text-zinc-300 mb-2 block">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom"
                      data-testid="input-name"
                      className={cn(
                        "w-full pl-12 pr-4 py-3.5 rounded-xl",
                        "bg-zinc-900/80 border border-zinc-800",
                        "text-white placeholder:text-zinc-500",
                        "focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20",
                        "transition-all duration-200"
                      )}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-zinc-300 mb-2 block">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                      data-testid="input-email"
                      className={cn(
                        "w-full pl-12 pr-4 py-3.5 rounded-xl",
                        "bg-zinc-900/80 border border-zinc-800",
                        "text-white placeholder:text-zinc-500",
                        "focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20",
                        "transition-all duration-200"
                      )}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-zinc-300 mb-2 block">
                    Téléphone (optionnel)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+33 6 12 34 56 78"
                      data-testid="input-phone"
                      className={cn(
                        "w-full pl-12 pr-4 py-3.5 rounded-xl",
                        "bg-zinc-900/80 border border-zinc-800",
                        "text-white placeholder:text-zinc-500",
                        "focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20",
                        "transition-all duration-200"
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <label className="text-sm font-medium text-zinc-300 mb-2 block">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Minimum 8 caractères"
                      data-testid="input-password"
                      className={cn(
                        "w-full pl-12 pr-12 py-3.5 rounded-xl",
                        "bg-zinc-900/80 border border-zinc-800",
                        "text-white placeholder:text-zinc-500",
                        "focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20",
                        "transition-all duration-200"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-zinc-300 mb-2 block">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Répétez le mot de passe"
                      data-testid="input-confirm-password"
                      className={cn(
                        "w-full pl-12 pr-4 py-3.5 rounded-xl",
                        "bg-zinc-900/80 border border-zinc-800",
                        "text-white placeholder:text-zinc-500",
                        "focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20",
                        "transition-all duration-200"
                      )}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    data-testid="checkbox-terms"
                    className="mt-1 w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-accent focus:ring-accent/20"
                  />
                  <label htmlFor="terms" className="text-sm text-zinc-400">
                    J'accepte les{" "}
                    <a href="#" className="text-accent hover:underline">conditions d'utilisation</a>
                    {" "}et la{" "}
                    <a href="#" className="text-accent hover:underline">politique de confidentialité</a>
                  </label>
                </div>
              </motion.div>
            )}

            <div className="flex gap-3 pt-2">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  data-testid="button-back"
                  className="flex-1 py-4 rounded-xl font-semibold text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  Retour
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                data-testid="button-submit"
                className={cn(
                  "flex-1 py-4 rounded-xl font-semibold text-black",
                  "bg-gradient-to-r from-accent to-accent/90",
                  "hover:from-accent/90 hover:to-accent/80",
                  "focus:outline-none focus:ring-2 focus:ring-accent/50",
                  "transition-all duration-300 glow-gold",
                  "flex items-center justify-center gap-2",
                  isLoading && "opacity-70 cursor-not-allowed"
                )}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{step === 1 ? "Continuer" : "Créer mon compte"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-center text-zinc-400 text-sm">
              Déjà un compte ?{" "}
              <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
