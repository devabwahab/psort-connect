import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { toast.error("Email is required"); return; }
    setLoading(true);

    if (isForgot) {
      const { error } = await resetPassword(email);
      setLoading(false);
      if (error) { toast.error(error.message); return; }
      toast.success("Password reset email sent! Check your inbox.");
      setIsForgot(false);
      return;
    }

    if (isSignUp) {
      if (!name.trim()) { toast.error("Name is required"); setLoading(false); return; }
      if (password.length < 6) { toast.error("Password must be at least 6 characters"); setLoading(false); return; }
      const { error } = await signUp(email, password, name);
      setLoading(false);
      if (error) { toast.error(error.message); return; }
      toast.success("Account created! Please check your email to verify your account.");
    } else {
      const { error } = await signIn(email, password);
      setLoading(false);
      if (error) { toast.error(error.message); return; }
      toast.success("Welcome back!");
      navigate("/dashboard");
    }
  };

  return (
    <Layout>
      <section className="section-padding bg-secondary min-h-[70vh] flex items-center">
        <div className="container-narrow">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-card rounded-2xl shadow-card border border-border p-8">
            <div className="text-center mb-8">
              <img src="/psort_logo.png" alt="PSORT" className="w-14 h-14 rounded-xl mx-auto mb-4 object-contain" />
              <h1 className="font-display text-2xl font-bold text-foreground mb-1">
                {isForgot ? "Reset Password" : isSignUp ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="text-sm text-muted-foreground font-heading">
                {isForgot ? "Enter your email to receive a reset link" : isSignUp ? "Join PSORT's member portal" : "Sign in to your PSORT account"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && !isForgot && (
                <div>
                  <label className="text-sm font-heading font-medium text-foreground block mb-1.5">Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Dr. Your Name"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
                </div>
              )}
              <div>
                <label className="text-sm font-heading font-medium text-foreground block mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
                </div>
              </div>
              {!isForgot && (
                <div>
                  <label className="text-sm font-heading font-medium text-foreground block mb-1.5">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {!isSignUp && !isForgot && (
                <div className="text-right">
                  <button type="button" onClick={() => setIsForgot(true)} className="text-xs text-teal font-heading hover:underline">Forgot Password?</button>
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full px-6 py-3 rounded-lg bg-teal text-teal-foreground font-heading font-semibold hover:bg-teal/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? "Please wait..." : isForgot ? "Send Reset Link" : isSignUp ? "Create Account" : "Sign In"} <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-6 text-center">
              {isForgot ? (
                <button onClick={() => setIsForgot(false)} className="text-sm text-teal font-heading font-semibold hover:underline">Back to Sign In</button>
              ) : (
                <p className="text-sm text-muted-foreground font-heading">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                  <button onClick={() => setIsSignUp(!isSignUp)} className="text-teal font-semibold hover:underline">
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
