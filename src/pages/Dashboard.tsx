import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Calendar,
  FileText,
  Settings,
  CreditCard,
  Award,
  BookOpen,
  LogOut,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  const menuItems = [
    { icon: User, label: "My Profile", href: "/dashboard/profile" },
    { icon: CreditCard, label: "Membership", href: "/dashboard/membership" },
    { icon: Calendar, label: "My Events", href: "/dashboard/events" },
    { icon: FileText, label: "My Abstracts", href: "/dashboard/abstracts" },
    { icon: Award, label: "Certificates", href: "/dashboard/certificates" },
    { icon: BookOpen, label: "CPD Records", href: "/dashboard/cpd" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <Layout>
      <section className="section-padding bg-muted min-h-screen">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  Welcome, {profile?.full_name || "Member"}
                </h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <Button variant="outline" onClick={signOut}>
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-xl bg-card shadow-card hover:shadow-card-hover border border-border transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      {item.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your {item.label.toLowerCase()}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-6 rounded-xl bg-accent/10 border border-accent/20"
          >
            <h3 className="font-heading font-semibold text-foreground mb-2">
              Quick Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">0</div>
                <div className="text-sm text-muted-foreground">Events Registered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">0</div>
                <div className="text-sm text-muted-foreground">Abstracts Submitted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">0</div>
                <div className="text-sm text-muted-foreground">CPD Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">Active</div>
                <div className="text-sm text-muted-foreground">Membership Status</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
