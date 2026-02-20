import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Vote, FileText, Users, CalendarDays, Award, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const pastResults = [
  { year: "2024", position: "President", winner: "Dr. Muhammad Ali", votes: 342 },
  { year: "2024", position: "General Secretary", winner: "Dr. Ayesha Siddiqui", votes: 298 },
  { year: "2022", position: "President", winner: "Dr. Khalid Mehmood", votes: 287 },
  { year: "2022", position: "General Secretary", winner: "Dr. Sana Rehman", votes: 256 },
  { year: "2020", position: "President", winner: "Dr. Tariq Hussain", votes: 201 },
  { year: "2020", position: "General Secretary", winner: "Dr. Nadia Qamar", votes: 189 },
];

const Elections = () => (
  <Layout>
    <section className="hero-gradient text-primary-foreground section-padding !py-20">
      <div className="container-narrow text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">PSORT Elections</h1>
          <p className="text-lg opacity-85 max-w-2xl mx-auto">Democratic governance ensuring transparent and fair representation for all members.</p>
        </motion.div>
      </div>
    </section>

    {/* Election Status */}
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-accent/10 border border-accent/20 text-center">
          <CalendarDays size={40} className="text-accent mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Next Election: December 2026</h2>
          <p className="text-muted-foreground mb-4">Nominations will open in October 2026. Only paid-up full members are eligible to vote and contest.</p>
          <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground font-heading font-semibold text-sm">Nominations Not Yet Open</span>
        </div>
      </div>
    </section>

    {/* Election Commissioner */}
    <section id="commissioner" className="section-padding bg-secondary">
      <div className="container-narrow">
        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-full bg-muted border-4 border-teal mb-4 flex items-center justify-center">
              <Users className="text-muted-foreground" size={40} />
            </div>
            <h3 className="font-heading font-bold text-foreground">Justice (R) Khalid Ahmad</h3>
            <p className="text-sm text-muted-foreground">Election Commissioner</p>
          </div>
          <div className="md:col-span-2">
            <SectionHeading badge="Commissioner" title="Election Commissioner" />
            <p className="text-muted-foreground leading-relaxed">
              The PSORT Election Commissioner is an independent authority appointed to oversee all electoral processes. The commissioner ensures elections are conducted fairly, transparently, and in strict accordance with the PSORT constitution.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Constitution */}
    <section id="constitution" className="section-padding bg-background">
      <div className="container-narrow text-center">
        <SectionHeading badge="Rules" title="Constitution & Electoral Rules" description="All elections follow the PSORT constitution. Download the full document for eligibility criteria, nomination procedures, and voting rules." />
        <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-navy text-navy-foreground font-heading font-semibold hover:bg-navy/90 transition-colors">
          <FileText size={16} /> Download Constitution (PDF)
        </a>
      </div>
    </section>

    {/* Past Results */}
    <section id="results" className="section-padding bg-secondary">
      <div className="container-narrow">
        <SectionHeading badge="History" title="Past Election Results" description="A record of democratic elections within PSORT." />
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
            <div className="grid grid-cols-4 gap-4 px-5 py-3 bg-navy text-navy-foreground font-heading font-semibold text-sm">
              <span>Year</span><span>Position</span><span>Winner</span><span className="text-right">Votes</span>
            </div>
            {pastResults.map((r, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="grid grid-cols-4 gap-4 px-5 py-3 border-t border-border text-sm">
                <span className="font-mono-label text-accent font-bold">{r.year}</span>
                <span className="text-muted-foreground">{r.position}</span>
                <span className="font-heading font-semibold text-foreground">{r.winner}</span>
                <span className="text-right text-muted-foreground">{r.votes}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-teal text-teal-foreground text-center">
      <div className="container-narrow">
        <Vote size={40} className="mx-auto mb-4 opacity-70" />
        <h2 className="font-display text-3xl font-bold mb-3">Your Voice Matters</h2>
        <p className="opacity-80 max-w-xl mx-auto mb-6">Ensure your membership is active to participate in the next PSORT elections. Every vote shapes the future of radiation therapy in Pakistan.</p>
        <Link to="/membership" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-white text-teal font-heading font-bold hover:bg-white/90 transition-colors">
          Check Membership Status <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  </Layout>
);

export default Elections;
