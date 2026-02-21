import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, Youtube, Linkedin } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (form.name.length > 100 || form.email.length > 255 || form.message.length > 2000) {
      toast.error("Input too long");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim() || null,
      message: form.message.trim(),
    });
    setLoading(false);
    if (error) { toast.error("Failed to send message. Please try again."); return; }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <section className="hero-gradient text-primary-foreground section-padding !py-20">
        <div className="container-narrow text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg opacity-85 max-w-2xl mx-auto">Have a question or want to get involved? We'd love to hear from you.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-5 gap-10">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-6">
              <SectionHeading badge="Get in Touch" title="Contact Information" center={false} />
              <div className="space-y-5">
                {[
                  { icon: Mail, label: "Email", value: "psortoffical@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+92 316 1624334" },
                  { icon: MapPin, label: "Address", value: "PSORT Secretariat, Karachi, Pakistan" },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <c.icon className="text-primary" size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{c.label}</div>
                      <div className="text-sm text-foreground mt-0.5">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="font-sans font-semibold text-foreground mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { icon: Youtube, label: "YouTube", href: "https://youtube.com/@psort-7k?si=7mo3JktknGDKmf90" },
                    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/pakistan-society-of-radiation-therapists-psort/" },
                    { icon: MessageCircle, label: "WhatsApp", href: "https://chat.whatsapp.com/LGvZtLQ48QNHqUmicq7581?mode=gi_t" },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors text-primary" aria-label={s.label}>
                      <s.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-sans font-semibold text-foreground mb-2">Office Hours</h4>
                <p className="text-sm text-muted-foreground">Monday – Friday: 9:00 AM – 5:00 PM</p>
                <p className="text-sm text-muted-foreground">Saturday – Sunday: Closed</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="p-8 rounded-xl bg-card shadow-card border border-border space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                  <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} maxLength={200}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                  <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={2000}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Your message..." />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                  {loading ? "Sending..." : "Send Message"} <Send size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="h-80 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="text-primary mx-auto mb-2" size={32} />
            <p className="text-sm text-muted-foreground font-medium">Karachi, Pakistan</p>
            <p className="text-xs text-muted-foreground mt-1">Interactive map can be embedded here</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
