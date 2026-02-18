import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const categories = ["All", "Conferences", "Workshops", "Community"];

const galleryItems = [
  { title: "Annual Conference 2025 — Opening Ceremony", category: "Conferences", color: "from-primary/30 to-accent/20" },
  { title: "CT Imaging Workshop — Hands-on Session", category: "Workshops", color: "from-accent/30 to-primary/20" },
  { title: "Community Health Camp — Lahore", category: "Community", color: "from-primary/20 to-accent/30" },
  { title: "Keynote Address — Dr. Ahmed Khan", category: "Conferences", color: "from-accent/20 to-primary/30" },
  { title: "MRI Training Workshop — Karachi", category: "Workshops", color: "from-primary/30 to-accent/10" },
  { title: "PSORT Annual Award Ceremony", category: "Conferences", color: "from-accent/10 to-primary/30" },
  { title: "Radiation Safety Awareness Drive", category: "Community", color: "from-primary/20 to-accent/20" },
  { title: "South Asian Radiology Summit Panel", category: "Conferences", color: "from-accent/30 to-primary/10" },
  { title: "Digital Radiography Masterclass", category: "Workshops", color: "from-primary/10 to-accent/30" },
];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? galleryItems : galleryItems.filter((g) => g.category === filter);

  return (
    <Layout>
      <section className="hero-gradient text-primary-foreground section-padding !py-20">
        <div className="container-narrow text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Gallery</h1>
            <p className="text-lg opacity-85 max-w-2xl mx-auto">Highlights from PSORT events, conferences, and community activities.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <SectionHeading badge="Photos" title="Event Gallery" />
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-shadow cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
                <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary text-2xl">📸</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <span className="text-xs text-muted-foreground mt-1 block">{item.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
