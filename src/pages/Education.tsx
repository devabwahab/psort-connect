import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const events = [
  { type: "Conference", title: "PSORT Annual Conference 2026", date: "March 15-17, 2026", location: "Islamabad Convention Center", desc: "Three days of keynote speakers, workshops, and networking with 500+ professionals.", upcoming: true },
  { type: "Workshop", title: "Advanced CT Imaging Techniques", date: "April 5, 2026", location: "Karachi Medical Center", desc: "Hands-on workshop covering the latest CT scanning protocols and dose optimization." },
  { type: "Training", title: "MRI Safety & Best Practices", date: "April 20, 2026", location: "Lahore University Hospital", desc: "Comprehensive training on MRI safety standards and patient management." },
  { type: "Workshop", title: "Digital Radiography Masterclass", date: "May 10, 2026", location: "Peshawar Institute of Radiology", desc: "Expert-led session on digital radiography quality assurance and image optimization." },
  { type: "Seminar", title: "Radiation Protection Awareness", date: "June 1, 2026", location: "Online (Zoom)", desc: "A webinar on radiation protection principles for all radiation workers." },
  { type: "Conference", title: "South Asian Radiology Summit", date: "July 22-23, 2026", location: "Islamabad Marriott Hotel", desc: "A regional conference bringing together radiation professionals from South Asia." },
];

const programs = [
  { title: "CPD Certification Program", desc: "Structured continuing professional development tracks with certification upon completion.", duration: "6 months" },
  { title: "Research Methodology Workshop", desc: "Learn to design, conduct, and publish radiation technology research.", duration: "3 days" },
  { title: "Leadership in Healthcare", desc: "Develop management and leadership skills for radiation department heads.", duration: "4 weeks" },
  { title: "Radiation Safety Officer Training", desc: "Comprehensive RSO training aligned with PNRA regulations.", duration: "2 weeks" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Education = () => (
  <Layout>
    <section className="hero-gradient text-primary-foreground section-padding !py-20">
      <div className="container-narrow text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Education & Events</h1>
          <p className="text-lg opacity-85 max-w-2xl mx-auto">Workshops, conferences, and training programs to advance your career in radiation technology.</p>
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

    {/* Training Programs */}
    <section className="section-padding bg-muted">
      <div className="container-narrow">
        <SectionHeading badge="Programs" title="Training Programs" description="Structured programs designed to enhance your skills and advance your career." />
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {programs.map((p, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-6 rounded-xl bg-card shadow-card border border-border">
              <h3 className="font-sans font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
              <div className="flex items-center gap-2 text-xs text-primary font-medium">
                <Clock size={13} /> Duration: {p.duration}
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
        <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-foreground text-foreground font-semibold hover:bg-primary-foreground/90 transition-colors">
          Contact Us <ArrowRight size={16} />
        </a>
      </motion.div>
    </section>
  </Layout>
);

export default Education;
