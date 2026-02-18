import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Facebook, Linkedin } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const Contact = () => (
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
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-6">
            <SectionHeading badge="Get in Touch" title="Contact Information" center={false} />
            <div className="space-y-5">
              {[
                { icon: Mail, label: "Email", value: "info@psort.org.pk" },
                { icon: Phone, label: "Phone", value: "+92 300 1234567" },
                { icon: MapPin, label: "Address", value: "PSORT Secretariat, Sector G-10, Islamabad, Pakistan" },
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
                  { icon: Facebook, label: "Facebook" },
                  { icon: Linkedin, label: "LinkedIn" },
                ].map((s, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors text-primary" aria-label={s.label}>
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

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
            <form onSubmit={(e) => e.preventDefault()} className="p-8 rounded-xl bg-card shadow-card border border-border space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                  <input className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                <textarea rows={5} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Your message..." />
              </div>
              <button type="submit" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                Send Message <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Map Placeholder */}
    <section className="h-80 bg-muted relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="text-primary mx-auto mb-2" size={32} />
          <p className="text-sm text-muted-foreground font-medium">Islamabad, Pakistan</p>
          <p className="text-xs text-muted-foreground mt-1">Interactive map can be embedded here</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default Contact;
