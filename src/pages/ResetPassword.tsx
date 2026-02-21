import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes("type=recovery")) {
      toast.error("Invalid reset link");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    if (password !== confirm) { toast.error("Passwords don't match"); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Password updated! Redirecting...");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <Layout>
      <section className="section-padding bg-secondary min-h-[70vh] flex items-center">
        <div className="container-narrow">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-card rounded-2xl shadow-card border border-border p-8">
            <h1 className="font-display text-2xl font-bold text-foreground mb-6 text-center">Set New Password</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-heading font-medium text-foreground block mb-1.5">New Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
                </div>
              </div>
              <div>
                <label className="text-sm font-heading font-medium text-foreground block mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full px-6 py-3 rounded-lg bg-teal text-teal-foreground font-heading font-semibold hover:bg-teal/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? "Updating..." : "Update Password"} <ArrowRight size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ResetPassword;
