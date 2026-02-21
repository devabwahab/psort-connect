import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Award, CalendarDays, CreditCard, FileText, Bell, Settings, ArrowRight, LogOut } from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const menuItems = [
  { icon: User, label: "Edit Profile", desc: "Update your personal and professional information" },
  { icon: Award, label: "My Membership", desc: "View membership details, download certificate" },
  { icon: CalendarDays, label: "My Events", desc: "Registered events, tickets, and certificates" },
  { icon: CreditCard, label: "My Payments", desc: "Invoices, receipts, and payment history" },
  { icon: FileText, label: "My Publications", desc: "Submitted research and review status" },
  { icon: Bell, label: "Notifications", desc: "Messages and announcements" },
  { icon: Settings, label: "Settings", desc: "Account settings and preferences" },
];

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [membership, setMembership] = useState<any>(null);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    // Fetch membership
    supabase.from("memberships").select("*, membership_tiers(name)").eq("user_id", user.id).eq("status", "active").maybeSingle()
      .then(({ data }) => setMembership(data));
    // Fetch event registration count
    supabase.from("event_registrations").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "registered")
      .then(({ count }) => setEventCount(count ?? 0));
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const dashCards = [
    { icon: Award, title: "Membership", value: membership?.membership_tiers?.name ?? "No Membership", sub: membership?.end_date ? `Expires: ${membership.end_date}` : "Apply for membership", color: "bg-teal/10 text-teal" },
    { icon: CalendarDays, title: "Registered Events", value: String(eventCount), sub: "Events you're attending", color: "bg-accent/10 text-accent" },
    { icon: FileText, title: "Profile Status", value: profile?.membership_status === "active" ? "Active" : "Incomplete", sub: "Complete your profile", color: "bg-navy/10 text-navy" },
    { icon: CreditCard, title: "Member Since", value: profile?.created_at ? new Date(profile.created_at).getFullYear().toString() : "—", sub: "Thank you for joining", color: "bg-teal/10 text-teal" },
  ];

  return (
    <Layout>
      <section className="section-padding bg-secondary">
        <div className="container-narrow">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-muted border-4 border-teal flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="text-muted-foreground" size={32} />
                )}
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Welcome, {profile?.full_name || user?.email?.split("@")[0] || "Member"}
                </h1>
                <p className="text-muted-foreground font-heading text-sm">
                  {membership?.membership_tiers?.name ?? "Member"} · {user?.email}
                </p>
              </div>
            </div>
            <button onClick={handleSignOut} className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive font-heading font-medium text-sm hover:bg-destructive/20 transition-colors">
              <LogOut size={14} /> Sign Out
            </button>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {dashCards.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl bg-card shadow-card border border-border">
                <div className={`w-10 h-10 rounded-lg ${c.color} flex items-center justify-center mb-3`}>
                  <c.icon size={20} />
                </div>
                <p className="text-xs text-muted-foreground font-heading mb-1">{c.title}</p>
                <p className="font-heading font-bold text-foreground text-lg">{c.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
              </motion.div>
            ))}
          </div>

          {!membership && (
            <div className="p-6 rounded-xl bg-accent/10 border border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
              <div>
                <h3 className="font-heading font-bold text-foreground">Become a Member</h3>
                <p className="text-sm text-muted-foreground">Apply for PSORT membership to unlock full access to events, resources, and voting rights.</p>
              </div>
              <Link to="/membership" className="px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-heading font-semibold text-sm hover:bg-accent/90 transition-colors shrink-0 inline-flex items-center gap-2">
                Apply Now <ArrowRight size={14} />
              </Link>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {menuItems.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center gap-4 p-5 rounded-xl bg-card shadow-card border border-border hover:shadow-card-hover transition-shadow cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                  <m.icon className="text-teal" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-semibold text-foreground group-hover:text-teal transition-colors">{m.label}</h4>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
                <ArrowRight className="text-muted-foreground group-hover:text-teal transition-colors shrink-0" size={16} />
              </motion.div>
            ))}
          </div>

          <button onClick={handleSignOut} className="sm:hidden mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-destructive/10 text-destructive font-heading font-medium text-sm hover:bg-destructive/20 transition-colors">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
