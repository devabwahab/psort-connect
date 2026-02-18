import { motion } from "framer-motion";
import { FileText, BookOpen, Download, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const articles = [
  { title: "Advances in IMRT Treatment Planning", author: "Dr. Ahmed Khan", date: "Jan 2026" },
  { title: "Quality Assurance in Radiation Therapy", author: "Dr. Fatima Noor", date: "Dec 2025" },
  { title: "AI Applications in Radiation Oncology", author: "Mr. Bilal Hussain", date: "Nov 2025" },
  { title: "Radiation Protection for Therapy Professionals", author: "Ms. Ayesha Malik", date: "Oct 2025" },
];

const guidelines = [
  { title: "Radiation Safety Guidelines for Therapy Departments", version: "v3.2", year: "2025" },
  { title: "Treatment Planning Standards for Pakistani Hospitals", version: "v2.1", year: "2025" },
  { title: "Patient Positioning and Immobilization Protocol", version: "v1.5", year: "2024" },
  { title: "Code of Ethics for Radiation Therapists", version: "v4.0", year: "2025" },
];

const publications = [
  { title: "PSORT Journal of Radiation Therapy", issue: "Vol. 12, Issue 1", status: "Latest" },
  { title: "Annual Report 2025", issue: "2025 Edition", status: "New" },
  { title: "PSORT Newsletter — Q4 2025", issue: "October–December 2025", status: "" },
  { title: "Conference Proceedings 2025", issue: "Islamabad Conference", status: "" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Resources = () => (
  <Layout>
    <section className="hero-gradient text-primary-foreground section-padding !py-20">
      <div className="container-narrow text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Resources</h1>
          <p className="text-lg opacity-85 max-w-2xl mx-auto">Guidelines, publications, and educational materials for radiation therapy professionals.</p>
        </motion.div>
      </div>
    </section>

    {/* Articles */}
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <SectionHeading badge="Articles" title="Featured Articles" />
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {articles.map((a, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-5 rounded-xl bg-card shadow-card border border-border hover:shadow-card-hover transition-shadow group cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="text-primary" size={18} />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-foreground group-hover:text-primary transition-colors">{a.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{a.author} · {a.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Guidelines */}
    <section className="section-padding bg-muted">
      <div className="container-narrow">
        <SectionHeading badge="Standards" title="Guidelines & Standards" />
        <div className="space-y-4 max-w-3xl mx-auto">
          {guidelines.map((g, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex items-center justify-between p-5 rounded-xl bg-card shadow-card border border-border">
              <div className="flex items-center gap-3">
                <BookOpen className="text-primary shrink-0" size={20} />
                <div>
                  <h4 className="font-sans font-medium text-foreground text-sm">{g.title}</h4>
                  <p className="text-xs text-muted-foreground">{g.version} · {g.year}</p>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Download className="text-primary" size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Publications */}
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <SectionHeading badge="Publications" title="PSORT Publications" />
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {publications.map((p, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-5 rounded-xl bg-card shadow-card border border-border flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-sans font-semibold text-foreground text-sm">{p.title}</h4>
                  {p.status && <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-semibold">{p.status}</span>}
                </div>
                <p className="text-xs text-muted-foreground">{p.issue}</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0">
                <ExternalLink className="text-primary" size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Resources;
