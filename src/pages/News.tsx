import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

const categoriesList = ["All", "Education", "Research", "Events", "Advocacy", "International"];

const articles = [
  { cat: "Events", date: "Feb 15, 2026", title: "PSORT Celebrates World Radiotherapy Awareness Day 2026", desc: "Nationwide observances across 60+ radiation therapy centers highlighting the critical role of radiotherapy in cancer care.", readTime: "4 min", featured: true },
  { cat: "Events", date: "Jan 20, 2026", title: "RTCON 2026 Abstract Submissions Now Open", desc: "Submit your research for oral and poster presentations at Pakistan's premier radiation therapy congress. Deadline March 15.", readTime: "3 min" },
  { cat: "International", date: "Dec 10, 2025", title: "PSORT Signs MOU with IAEA for National Training Program", desc: "A landmark collaboration to improve radiation therapy standards and workforce development nationwide.", readTime: "5 min" },
  { cat: "Education", date: "Nov 25, 2025", title: "New CPD Workshop Series Announced for 2026", desc: "Six hands-on workshops covering IMRT, VMAT, brachytherapy, and quality assurance planned across four cities.", readTime: "3 min" },
  { cat: "Advocacy", date: "Nov 5, 2025", title: "PSORT Submits Policy Brief to Ministry of Health", desc: "Recommendations for increasing radiotherapy access in underserved regions of Pakistan presented to government officials.", readTime: "6 min" },
  { cat: "Research", date: "Oct 15, 2025", title: "JPSORT Vol. 8 Issue 2 Published — Special Issue on AI in RT", desc: "Latest journal issue features groundbreaking research on artificial intelligence applications in radiation therapy planning.", readTime: "4 min" },
  { cat: "Education", date: "Sep 30, 2025", title: "Young Therapist Fellowship Applications Open", desc: "Five funded fellowship positions for early-career radiation therapists to train at leading cancer centers.", readTime: "3 min" },
  { cat: "International", date: "Sep 7, 2025", title: "PSORT Represents Pakistan at ESTRO Congress 2025", desc: "Three oral presentations and eight posters from Pakistani researchers presented at Europe's largest RT conference.", readTime: "4 min" },
];

const News = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = articles
    .filter((a) => filter === "All" || a.cat === filter)
    .filter((a) => a.title.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout>
      <section className="hero-gradient text-primary-foreground section-padding !py-20">
        <div className="container-narrow text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">News & Blog</h1>
            <p className="text-lg opacity-85 max-w-2xl mx-auto">Stay updated with the latest from PSORT — news, research, events, and advocacy.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categoriesList.map((c) => (
                <button key={c} onClick={() => setFilter(c)}
                  className={`px-4 py-2 rounded-lg text-sm font-heading font-medium transition-colors ${filter === c ? "bg-teal text-teal-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className={`rounded-xl bg-card shadow-card border border-border overflow-hidden group ${a.featured ? "md:col-span-2 lg:col-span-1" : ""}`}>
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <img src="/placeholder.svg" alt={a.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal/10 text-teal font-heading font-semibold">{a.cat}</span>
                    <span className="text-muted-foreground font-heading">{a.readTime} read</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono-label block mb-2">{a.date}</span>
                  <h3 className="font-heading font-bold text-foreground mb-2 group-hover:text-teal transition-colors leading-snug">{a.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{a.desc}</p>
                  <a href="#" className="inline-flex items-center gap-1 text-teal text-sm font-heading font-medium mt-4 hover:gap-2 transition-all">
                    Read More <ArrowRight size={13} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-heading">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default News;
