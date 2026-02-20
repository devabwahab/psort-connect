import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Award, CalendarDays, CreditCard, FileText, Bell, Settings, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

const dashCards = [
  { icon: Award, title: "Membership Status", value: "Full Member", sub: "Expires: Dec 2026", color: "bg-teal/10 text-teal" },
  { icon: CalendarDays, title: "CPD Points", value: "14 / 20", sub: "6 points remaining this year", color: "bg-accent/10 text-accent" },
  { icon: FileText, title: "Registered Events", value: "2", sub: "RTCON 2026, CPD Workshop", color: "bg-navy/10 text-navy" },
  { icon: CreditCard, title: "Payments", value: "3 invoices", sub: "All paid", color: "bg-teal/10 text-teal" },
];

const menuItems = [
  { icon: User, label: "Edit Profile", desc: "Update your personal and professional information" },
  { icon: Award, label: "My Membership", desc: "View membership details, download certificate" },
  { icon: CalendarDays, label: "My Events", desc: "Registered events, tickets, and certificates" },
  { icon: CreditCard, label: "My Payments", desc: "Invoices, receipts, and payment history" },
  { icon: FileText, label: "My Publications", desc: "Submitted research and review status" },
  { icon: Bell, label: "Notifications", desc: "Messages and announcements" },
  { icon: Settings, label: "Settings", desc: "Account settings and preferences" },
];

const Dashboard = () => (
  <Layout>
    <section className="section-padding bg-secondary">
      <div className="container-narrow">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 rounded-full bg-muted border-4 border-teal flex items-center justify-center">
            <User className="text-muted-foreground" size={32} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Welcome, Dr. Member</h1>
            <p className="text-muted-foreground font-heading text-sm">Full Member · PSORT-2024-0123</p>
          </div>
        </motion.div>

        {/* Stats Cards */}
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

        {/* Renewal CTA */}
        <div className="p-6 rounded-xl bg-accent/10 border border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <h3 className="font-heading font-bold text-foreground">Membership Renewal</h3>
            <p className="text-sm text-muted-foreground">Your membership expires in 10 months. Renew early for uninterrupted access.</p>
          </div>
          <Link to="/membership" className="px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-heading font-semibold text-sm hover:bg-accent/90 transition-colors shrink-0 inline-flex items-center gap-2">
            Renew Now <ArrowRight size={14} />
          </Link>
        </div>

        {/* Menu */}
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
      </div>
    </section>
  </Layout>
);

export default Dashboard;
