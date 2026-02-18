import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock, ArrowRight, Megaphone } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const events = [
  { type: "Conference", title: "PSORT Annual Conference 2026", date: "March 15-17, 2026", location: "Islamabad Convention Center", desc: "Three days of keynote speakers, workshops, and networking with 500+ professionals.", upcoming: true },
  { type: "Workshop", title: "Advanced Radiation Therapy Techniques", date: "April 5, 2026", location: "Karachi Medical Center", desc: "Hands-on workshop covering the latest treatment planning and delivery methods." },
  { type: "CPD", title: "Radiation Safety & Quality Assurance", date: "April 20, 2026", location: "Lahore University Hospital", desc: "CPD-accredited training on radiation safety standards and QA protocols." },
  { type: "Workshop", title: "IMRT & VMAT Planning Masterclass", date: "May 10, 2026", location: "Peshawar Institute of Oncology", desc: "Expert-led session on intensity-modulated and volumetric-modulated arc therapy." },
  { type: "Seminar", title: "Emerging Technologies in Radiation Therapy", date: "June 1, 2026", location: "Online (Zoom)", desc: "A webinar exploring AI, proton therapy, and adaptive radiation therapy." },
  { type: "Conference", title: "South Asian Oncology Summit", date: "July 22-23, 2026", location: "Islamabad Marriott Hotel", desc: "A regional conference bringing together radiation therapy professionals from South Asia." },
];

const announcements = [
  { date: "Feb 2026", title: "PSORT Annual Elections — Nominations Open", desc: "Members are invited to nominate candidates for the 2026 executive committee." },
  { date: "Jan 2026", title: "Updated CPD Requirements for 2026", desc: "All full members must complete a minimum of 20 CPD hours this year." },
  { date: "Jan 2026", title: "New Partnership with Pakistan Nuclear Regulatory Authority", desc: "PSORT signs MoU with PNRA to enhance radiation safety training nationwide." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Events = () => (
  <Layout>
    <section className="hero-gradient text-primary-foreground section-padding !py-20">
      <div className="container-narrow text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Events & News</h1>
          <p className="text-lg opacity-85 max-w-2xl mx-auto">Conferences, workshops, CPD events, and the latest announcements from PSORT.</p>
        </motion.div>
      </div>
    </section>

    {/* Upcoming Events */}
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <SectionHeading badge="Calendar" title="Upcoming Events" description="Mark your calendar for these upcoming PSORT events." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((e, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-6 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow border border-border flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${e.upcoming ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {e.type}
                </span>
              </div>
              <h3 className="font-sans font-semibold text-foreground mb-3">{e.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{e.desc}</p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><CalendarDays size={13} /> {e.date}</div>
                <div className="flex items-center gap-2"><MapPin size={13} /> {e.location}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* News & Announcements */}
    <section className="section-padding bg-muted">
      <div className="container-narrow">
        <SectionHeading badge="News" title="Announcements" description="Stay informed with the latest news from PSORT." />
        <div className="space-y-4 max-w-3xl mx-auto">
          {announcements.map((a, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex gap-4 p-5 rounded-xl bg-card shadow-card border border-border">
              <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                <Megaphone className="text-accent" size={18} />
              </div>
              <div>
                <h4 className="font-sans font-semibold text-foreground mb-1">{a.title}</h4>
                <p className="text-sm text-muted-foreground mb-1">{a.desc}</p>
                <span className="text-xs text-muted-foreground">{a.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="hero-gradient text-primary-foreground section-padding !py-14 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Want to host or suggest an event?</h2>
        <p className="opacity-85 mb-6">We welcome proposals from members and institutions for educational events.</p>
        <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors">
          Contact Us <ArrowRight size={16} />
        </a>
      </motion.div>
    </section>
  </Layout>
);

export default Events;
