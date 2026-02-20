import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Microscope, Monitor, ShieldCheck, Newspaper, FileText, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const sections = [
  { id: "education", icon: BookOpen, title: "PSORT Education", desc: "Accredited CPD programs, workshops, and online courses covering IMRT, VMAT, brachytherapy, treatment planning, and radiation safety. Over 150 professionals trained annually through structured programs.", color: "bg-teal/10 text-teal" },
  { id: "research", icon: Microscope, title: "Research & Clinical Trials", desc: "Supporting multi-center clinical trials across Pakistan, establishing research methodology workshops, and facilitating collaboration with international research networks including IAEA CRPs.", color: "bg-accent/10 text-accent" },
  { id: "platforms", icon: Monitor, title: "Radiation Therapy Platforms", desc: "Developing standardized protocols for LINAC-based treatments, cobalt-60 units, brachytherapy, and emerging technologies. Creating national benchmarking standards for RT centers.", color: "bg-navy/10 text-navy" },
  { id: "prevention", icon: ShieldCheck, title: "Cancer Prevention", desc: "Leading awareness campaigns for early cancer detection, partnering with hospitals for screening programs, and coordinating World Cancer Day and World Radiotherapy Awareness Day observances.", color: "bg-teal/10 text-teal" },
  { id: "media", icon: Newspaper, title: "Media Cell", desc: "Managing PSORT's digital presence, producing educational content, documenting events, and running social media campaigns to raise awareness about radiation therapy in Pakistan.", color: "bg-accent/10 text-accent" },
  { id: "journal", icon: FileText, title: "PSORT Journal (JPSORT)", desc: "Pakistan's peer-reviewed journal dedicated to radiation therapy research, clinical protocols, case studies, and reviews. Published biannually with contributions from national and international authors.", color: "bg-navy/10 text-navy" },
];

const publications = [
  { year: "2025", title: "JPSORT Vol. 8, Issue 2", topic: "Special Issue: AI in RT Planning" },
  { year: "2025", title: "JPSORT Vol. 8, Issue 1", topic: "Brachytherapy Outcomes in Pakistan" },
  { year: "2024", title: "JPSORT Vol. 7, Issue 2", topic: "Quality Assurance Frameworks" },
  { year: "2024", title: "JPSORT Vol. 7, Issue 1", topic: "Women in Radiation Therapy" },
];

const RDWing = () => (
  <Layout>
    <section className="hero-gradient text-primary-foreground section-padding !py-20">
      <div className="container-narrow text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Research & Development Wing</h1>
          <p className="text-lg opacity-85 max-w-2xl mx-auto">Driving innovation, education, and evidence-based practice in radiation therapy across Pakistan.</p>
        </motion.div>
      </div>
    </section>

    {/* Overview */}
    <section className="section-padding bg-background">
      <div className="container-narrow max-w-4xl text-center">
        <SectionHeading badge="Overview" title="R&D Wing Mission" />
        <p className="text-muted-foreground leading-relaxed text-lg">
          The PSORT R&D Wing coordinates all educational, research, and knowledge-dissemination activities. Our six divisions work together to advance clinical practice, support emerging researchers, and ensure Pakistan's radiation therapy community stays at the forefront of global developments.
        </p>
      </div>
    </section>

    {/* Sub-sections */}
    <section className="section-padding bg-secondary">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((s, i) => (
            <motion.div key={s.id} id={s.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="p-7 rounded-xl bg-card shadow-card border border-border">
              <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-5`}>
                <s.icon size={24} />
              </div>
              <h3 className="font-heading font-bold text-foreground text-lg mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Publications */}
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <SectionHeading badge="Publications" title="Recent Publications" description="Browse the latest issues of JPSORT and research outputs." />
        <div className="max-w-3xl mx-auto space-y-4">
          {publications.map((p, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="flex items-center gap-4 p-5 rounded-xl bg-card shadow-card border border-border">
              <span className="font-mono-label text-accent font-bold text-lg shrink-0">{p.year}</span>
              <div className="flex-1">
                <h4 className="font-heading font-semibold text-foreground">{p.title}</h4>
                <p className="text-sm text-muted-foreground">{p.topic}</p>
              </div>
              <ArrowRight className="text-teal shrink-0" size={16} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Collaboration CTA */}
    <section className="section-padding bg-teal text-teal-foreground text-center">
      <div className="container-narrow">
        <h2 className="font-display text-3xl font-bold mb-4">Interested in Collaboration?</h2>
        <p className="opacity-80 max-w-xl mx-auto mb-6">We welcome research partnerships, joint clinical trials, and educational collaborations from national and international institutions.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-white text-teal font-heading font-bold hover:bg-white/90 transition-colors">
          Get in Touch <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  </Layout>
);

export default RDWing;
