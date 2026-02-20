import { useState } from "react";
import { motion } from "framer-motion";
import { Image, Play, X } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

const categories = ["All", "RTCON 2024", "RTCON 2023", "Workshops", "Awareness Events", "Ceremonies"];

const photos = [
  { cat: "RTCON 2024", alt: "RTCON 2024 opening ceremony" },
  { cat: "RTCON 2024", alt: "Keynote session at RTCON 2024" },
  { cat: "RTCON 2024", alt: "Poster presentations hall" },
  { cat: "RTCON 2024", alt: "Networking dinner" },
  { cat: "RTCON 2023", alt: "RTCON 2023 group photo" },
  { cat: "RTCON 2023", alt: "Workshop on IMRT planning" },
  { cat: "RTCON 2023", alt: "Award ceremony" },
  { cat: "Workshops", alt: "Hands-on VMAT training" },
  { cat: "Workshops", alt: "QA calibration session" },
  { cat: "Awareness Events", alt: "World RT Awareness Day 2025" },
  { cat: "Awareness Events", alt: "Cancer screening camp" },
  { cat: "Ceremonies", alt: "PSORT annual gala 2024" },
];

const videos = [
  { title: "RTCON 2024 Highlights", desc: "A recap of Pakistan's biggest RT congress" },
  { title: "World RT Day 2025 Campaign", desc: "National awareness campaign across 60+ centers" },
  { title: "PSORT CPD Workshop — IMRT", desc: "Hands-on intensity modulated radiotherapy training" },
];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [tab, setTab] = useState<"photos" | "videos">("photos");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "All" ? photos : photos.filter((p) => p.cat === filter);

  return (
    <Layout>
      <section className="hero-gradient text-primary-foreground section-padding !py-20">
        <div className="container-narrow text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Gallery</h1>
            <p className="text-lg opacity-85 max-w-2xl mx-auto">Explore photos and videos from PSORT events, conferences, and workshops.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {(["photos", "videos"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-lg font-heading font-semibold text-sm capitalize transition-colors ${tab === t ? "bg-teal text-teal-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
                {t}
              </button>
            ))}
          </div>

          {tab === "photos" && (
            <>
              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((c) => (
                  <button key={c} onClick={() => setFilter(c)}
                    className={`px-4 py-1.5 rounded-full text-sm font-heading font-medium transition-colors ${filter === c ? "bg-navy text-navy-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
                    {c}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filtered.map((p, i) => (
                  <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    onClick={() => setLightbox(i)}
                    className="aspect-square bg-muted rounded-xl overflow-hidden cursor-pointer group relative">
                    <img src="/placeholder.svg" alt={p.alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/50 transition-colors flex items-center justify-center">
                      <Image className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {tab === "videos" && (
            <div className="grid md:grid-cols-3 gap-6">
              {videos.map((v, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="rounded-xl overflow-hidden bg-card shadow-card border border-border">
                  <div className="aspect-video bg-muted flex items-center justify-center cursor-pointer group">
                    <Play className="text-muted-foreground group-hover:text-teal transition-colors" size={48} />
                  </div>
                  <div className="p-5">
                    <h4 className="font-heading font-bold text-foreground mb-1">{v.title}</h4>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white" onClick={() => setLightbox(null)}>
            <X size={32} />
          </button>
          <div className="max-w-4xl w-full aspect-video bg-muted rounded-xl flex items-center justify-center">
            <p className="text-white font-heading">{filtered[lightbox]?.alt}</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
