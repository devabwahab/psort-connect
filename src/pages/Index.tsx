import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, BookOpen, Users, Lightbulb, HeartPulse, CalendarDays, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";

const highlights = [
  { icon: Award, title: "Excellence", desc: "Promoting the highest standards in radiation technology practice" },
  { icon: BookOpen, title: "Education", desc: "Continuous professional development and training opportunities" },
  { icon: Users, title: "Community", desc: "A growing network of radiation technology professionals" },
  { icon: Lightbulb, title: "Innovation", desc: "Advancing research and new technologies in medical imaging" },
];

const news = [
  { date: "Feb 10, 2026", title: "Annual Conference 2026 — Registration Open", desc: "Join us for three days of learning, networking, and innovation in radiation technology." },
  { date: "Jan 25, 2026", title: "New CPD Workshop Series Announced", desc: "Monthly workshops covering the latest in CT, MRI, and interventional radiology." },
  { date: "Jan 12, 2026", title: "PSORT Partners with WHO Pakistan", desc: "A landmark collaboration to improve radiation safety standards nationwide." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 container-narrow section-padding !py-20 lg:!py-32 text-primary-foreground">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary-foreground/30 text-sm font-medium mb-6 bg-primary-foreground/10 backdrop-blur-sm">
            Pakistan Society of Radiation Technologists
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Advancing Excellence in Radiation Technology
          </h1>
          <p className="text-lg sm:text-xl opacity-85 max-w-xl mb-8 leading-relaxed">
            Dedicated to promoting professional development, research, and collaboration among radiation technology professionals across Pakistan.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/membership"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-foreground text-foreground font-semibold hover:bg-primary-foreground/90 transition-colors"
            >
              Become a Member <ArrowRight size={18} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary-foreground/40 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Stats Bar */}
    <section className="bg-primary text-primary-foreground">
      <div className="container-narrow grid grid-cols-2 lg:grid-cols-4 gap-6 py-10 px-4 sm:px-6 lg:px-8">
        {[
          { num: "2,500+", label: "Members" },
          { num: "150+", label: "Events Hosted" },
          { num: "35+", label: "Years of Service" },
          { num: "50+", label: "Partner Institutions" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
            <div className="text-3xl sm:text-4xl font-bold">{s.num}</div>
            <div className="text-sm opacity-80 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Mission Highlights */}
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <SectionHeading badge="Our Mission" title="Empowering Radiation Professionals" description="We are committed to advancing the field of radiation technology through education, collaboration, and innovation." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="p-6 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow border border-border"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <h.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-sans font-semibold text-foreground text-lg mb-2">{h.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* About Preview */}
    <section className="section-padding bg-muted">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
              About PSORT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              A National Voice for Radiation Technologists
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Pakistan Society of Radiation Technologists (PSORT) is a national professional body representing radiographers, radiation therapists, and medical imaging professionals across the country.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Founded with a vision to elevate the profession, PSORT works tirelessly to promote education, ensure quality standards, and foster a community of practice that benefits both professionals and patients.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Learn more about us <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4">
            {[HeartPulse, BookOpen, Users, Award].map((Icon, i) => (
              <div key={i} className="p-6 rounded-xl bg-card shadow-card border border-border flex flex-col items-center text-center">
                <Icon className="text-primary mb-3" size={28} />
                <span className="text-sm font-medium text-foreground">
                  {["Patient Care", "Education", "Collaboration", "Standards"][i]}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* News & Events */}
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <SectionHeading badge="Stay Updated" title="Latest News & Events" description="Keep up with the latest developments, events, and announcements from PSORT." />
        <div className="grid md:grid-cols-3 gap-6">
          {news.map((n, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="p-6 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow border border-border group"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <CalendarDays size={14} />
                {n.date}
              </div>
              <h3 className="font-sans font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{n.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{n.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/education" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            View all events <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="hero-gradient text-primary-foreground">
      <div className="container-narrow section-padding !py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Join the PSORT Community</h2>
          <p className="text-lg opacity-85 max-w-xl mx-auto mb-8">
            Be part of Pakistan's leading professional body for radiation technologists. Grow your career, expand your network, and make an impact.
          </p>
          <Link
            to="/membership"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary-foreground text-foreground font-semibold hover:bg-primary-foreground/90 transition-colors"
          >
            Become a Member Today <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Index;
