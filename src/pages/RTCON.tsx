import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin, Users, Download, Award, Globe, Mic, FileText } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const speakers = [
  { name: "Prof. Sarah Mitchell", title: "Director of Radiation Oncology, MD Anderson", topic: "AI in Adaptive Radiotherapy" },
  { name: "Dr. Ahmed Al-Rashid", title: "IAEA Technical Officer", topic: "Global RT Workforce Development" },
  { name: "Prof. Elena Vasquez", title: "ESTRO President-Elect", topic: "Proton Therapy: Future Perspectives" },
  { name: "Dr. Raj Patel", title: "Chief Medical Physicist, Tata Memorial", topic: "Quality Assurance in VMAT" },
];

const organizing = [
  { name: "Dr. Muhammad Ali", role: "Congress President" },
  { name: "Dr. Fatima Ahmed", role: "Scientific Chair" },
  { name: "Dr. Hassan Sheikh", role: "Organizing Secretary" },
  { name: "Dr. Ayesha Siddiqui", role: "Abstract Committee Chair" },
  { name: "Dr. Usman Tariq", role: "Registration Chair" },
  { name: "Dr. Nadia Qamar", role: "Sponsorship Chair" },
];

const sponsorTiers = [
  { tier: "Platinum", price: "PKR 2,000,000", perks: "Logo on all materials, 10 complimentary passes, keynote session sponsorship, exhibition booth (premium)", color: "bg-foreground text-background" },
  { tier: "Gold", price: "PKR 1,000,000", perks: "Logo on materials, 5 complimentary passes, workshop sponsorship, exhibition booth", color: "bg-accent text-accent-foreground" },
  { tier: "Silver", price: "PKR 500,000", perks: "Logo on select materials, 3 complimentary passes, exhibition booth", color: "bg-teal text-teal-foreground" },
  { tier: "Bronze", price: "PKR 250,000", perks: "Logo listing, 2 complimentary passes, table display", color: "bg-secondary text-secondary-foreground" },
];

const agenda = [
  { day: "Day 1 — Oct 15", items: ["Opening Ceremony & Keynote Address", "Plenary: AI in Radiation Therapy", "Oral Presentations (Session A)", "Workshop: IMRT Planning", "Welcome Dinner"] },
  { day: "Day 2 — Oct 16", items: ["Keynote: Global RT Workforce", "Oral Presentations (Session B & C)", "Poster Session", "Workshop: Quality Assurance", "Women in RT Panel Discussion", "Gala Dinner & Awards"] },
  { day: "Day 3 — Oct 17", items: ["Keynote: Proton Therapy", "Young Therapist Presentations", "Industry Symposium", "Closing Ceremony & Prizes"] },
];

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return (
    <div className="flex justify-center gap-4 sm:gap-6">
      {Object.entries(time).map(([label, val]) => (
        <div key={label} className="text-center">
          <div className="text-3xl sm:text-5xl font-bold font-display">{String(val).padStart(2, "0")}</div>
          <div className="text-xs uppercase tracking-wider opacity-60 font-heading mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}

const RTCON = () => (
  <Layout>
    {/* Hero */}
    <section className="relative bg-navy text-navy-foreground overflow-hidden">
      <div className="absolute inset-0 grain-texture opacity-50" />
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-[0.03] flex items-center justify-center">
        <span className="text-[20vw] font-display font-bold select-none">RT</span>
      </div>
      <div className="relative z-10 container-narrow section-padding !py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-heading font-bold uppercase tracking-wider mb-4">Annual Conference</span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">RTCON 2026</h1>
          <p className="text-xl font-heading mb-2 opacity-80">Annual Radiation Therapy Congress of Pakistan</p>
          <p className="text-lg font-heading font-semibold text-teal mb-8">
            <CalendarDays size={16} className="inline mr-2" />October 15–17, 2026 &nbsp;|&nbsp; <MapPin size={16} className="inline mr-1" />Karachi, Pakistan
          </p>
          <CountdownTimer targetDate="2026-10-15T09:00:00" />
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link to="/membership" className="px-7 py-3.5 rounded-lg bg-accent text-accent-foreground font-heading font-semibold hover:bg-accent/90 transition-colors">Register Now</Link>
            <a href="#agenda" className="px-7 py-3.5 rounded-lg border-2 border-white/30 text-white font-heading font-semibold hover:bg-white/10 transition-colors">Scientific Program</a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* About Conference */}
    <section className="section-padding bg-background">
      <div className="container-narrow max-w-4xl text-center">
        <SectionHeading badge="About" title="About RTCON 2026" />
        <p className="text-muted-foreground leading-relaxed text-lg">
          RTCON is Pakistan's premier annual radiation therapy congress, bringing together over 500 radiation therapists, medical physicists, oncologists, and industry leaders from across Pakistan and the region. The 2026 edition features cutting-edge scientific sessions, hands-on workshops, poster presentations, and unparalleled networking opportunities.
        </p>
      </div>
    </section>

    {/* Keynote Speakers */}
    <section className="section-padding bg-secondary">
      <div className="container-narrow">
        <SectionHeading badge="Speakers" title="Keynote Speakers" description="World-class experts presenting at RTCON 2026." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map((s, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="p-6 rounded-xl bg-card shadow-card border border-border text-center">
              <div className="w-20 h-20 rounded-full bg-muted border-2 border-teal/30 mx-auto mb-4 flex items-center justify-center">
                <Mic className="text-muted-foreground" size={28} />
              </div>
              <h4 className="font-heading font-bold text-foreground">{s.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{s.title}</p>
              <span className="inline-block mt-3 px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-heading font-semibold">{s.topic}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Agenda */}
    <section id="agenda" className="section-padding bg-background">
      <div className="container-narrow">
        <SectionHeading badge="Program" title="Scientific Program" description="Three days of cutting-edge sessions and workshops." />
        <div className="grid md:grid-cols-3 gap-6">
          {agenda.map((d, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="p-6 rounded-xl bg-card shadow-card border border-border">
              <h3 className="font-heading font-bold text-foreground text-lg mb-4 pb-3 border-b border-border">{d.day}</h3>
              <ul className="space-y-3">
                {d.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-navy text-navy-foreground font-heading font-semibold hover:bg-navy/90 transition-colors">
            <Download size={16} /> Download Full Program (PDF)
          </a>
        </div>
      </div>
    </section>

    {/* Abstract Submission */}
    <section className="section-padding bg-teal text-teal-foreground">
      <div className="container-narrow text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <FileText size={40} className="mx-auto mb-4 opacity-70" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">Submit Your Abstract</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto mb-6">
            Share your research at RTCON 2026. Submissions open for oral and poster presentations. Deadline: March 15, 2026.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-white text-teal font-heading font-bold hover:bg-white/90 transition-colors">
            Submit Abstract <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>

    {/* Organizing Committee */}
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <SectionHeading badge="Committee" title="Organizing Committee" description="The team behind RTCON 2026." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {organizing.map((m, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-muted border-2 border-teal/30 mb-3 flex items-center justify-center">
                <Users className="text-muted-foreground" size={24} />
              </div>
              <h4 className="font-heading font-semibold text-foreground text-sm">{m.name}</h4>
              <p className="text-xs text-muted-foreground">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Sponsorship */}
    <section className="section-padding bg-secondary">
      <div className="container-narrow">
        <SectionHeading badge="Sponsors" title="Sponsorship Packages" description="Partner with RTCON 2026 and connect with 500+ radiation therapy professionals." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sponsorTiers.map((s, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="rounded-xl overflow-hidden bg-card shadow-card border border-border flex flex-col">
              <div className={`${s.color} px-5 py-4 text-center`}>
                <h3 className="font-heading font-bold text-lg">{s.tier}</h3>
                <p className="text-sm font-mono-label mt-1">{s.price}</p>
              </div>
              <div className="p-5 flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed">{s.perks}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Venue */}
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <SectionHeading badge="Location" title="Venue & Travel" />
            <div className="space-y-4 text-muted-foreground">
              <p><strong className="text-foreground">Venue:</strong> Pearl Continental Hotel, Karachi</p>
              <p><strong className="text-foreground">Address:</strong> Club Road, Civil Lines, Karachi 75530</p>
              <p><strong className="text-foreground">Airport:</strong> Jinnah International Airport (KHI) — 20 minutes by car</p>
              <p><strong className="text-foreground">Accommodation:</strong> Special rates available at the conference hotel and nearby properties.</p>
            </div>
          </div>
          <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
            <MapPin className="text-muted-foreground" size={48} />
            <span className="text-muted-foreground font-heading ml-2">Map Placeholder</span>
          </div>
        </div>
      </div>
    </section>

    {/* Registration CTA */}
    <section className="relative bg-navy text-navy-foreground overflow-hidden">
      <div className="absolute inset-0 grain-texture opacity-50" />
      <div className="relative z-10 container-narrow section-padding !py-16 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Register for RTCON 2026</h2>
        <p className="opacity-80 mb-8 max-w-xl mx-auto">Early bird registration open until June 30, 2026. Student discounts available.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/membership" className="px-7 py-3.5 rounded-lg bg-accent text-accent-foreground font-heading font-semibold hover:bg-accent/90 transition-colors">
            Register Now <ArrowRight size={16} className="inline ml-1" />
          </Link>
          <a href="#" className="px-7 py-3.5 rounded-lg border-2 border-white/30 text-white font-heading font-semibold hover:bg-white/10 transition-colors">
            <Download size={16} className="inline mr-1" /> Industry Participation Guidelines
          </a>
        </div>
      </div>
    </section>
  </Layout>
);

export default RTCON;
