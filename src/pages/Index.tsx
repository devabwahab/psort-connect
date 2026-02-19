import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, CalendarDays, ChevronLeft, ChevronRight, Quote, BookOpen, Microscope, Users, GraduationCap, HeartPulse, Shield, Award, Globe } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";

/* ── Counter Hook ── */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const StatItem = ({ num, suffix, label }: { num: number; suffix: string; label: string }) => {
  const { count, ref } = useCountUp(num);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-bold font-display">{count}{suffix}</div>
      <div className="text-sm opacity-70 mt-1 font-heading">{label}</div>
    </div>
  );
};

/* ── Data ── */
const news = [
  { date: "Feb 2026", title: "PSORT Celebrates World Radiotherapy Awareness Day 2026", desc: "Nationwide observances across 60+ radiation therapy centers highlighting the critical role of radiotherapy in cancer care.", readTime: "4 min" },
  { date: "Jan 2026", title: "RTCON 2026 Abstract Submissions Now Open — Deadline March 15", desc: "Submit your research for oral and poster presentations at Pakistan's premier radiation therapy congress.", readTime: "3 min" },
  { date: "Dec 2025", title: "PSORT Signs MOU with IAEA for National Training Program", desc: "A landmark collaboration to improve radiation therapy standards and workforce development nationwide.", readTime: "5 min" },
];

const testimonials = [
  { quote: "PSORT's CPD workshops transformed my clinical practice. The hands-on IMRT training gave me confidence to deliver cutting-edge treatments to my patients.", name: "Dr. Ayesha Khan", title: "Senior Radiation Therapist, Aga Khan University Hospital, Karachi" },
  { quote: "Thanks to the radiation therapists trained through PSORT programs, I received world-class treatment right here in Pakistan. They explained every step and made me feel safe.", name: "Fatima Bibi", title: "Cancer Survivor, Lahore" },
  { quote: "PSORT's international collaboration has been exemplary. Their commitment to bridging the gap in radiation therapy access is inspiring the entire region.", name: "Prof. Marco Ricci", title: "ESTRO Board Member, Brussels" },
  { quote: "The quality assurance frameworks developed by PSORT have standardized dosimetry practices across our department, significantly improving patient safety.", name: "Dr. Ahmed Raza", title: "Chief Medical Physicist, INMOL Cancer Hospital" },
  { quote: "As a young therapist, PSORT's mentorship program connected me with leaders who shaped my career. The Young Therapist initiative is a game-changer.", name: "Sarah Malik", title: "Radiation Therapist, Shaukat Khanum Memorial" },
];

const councilMembers = [
  { name: "Dr. Muhammad Ali", role: "President", color: "bg-navy" },
  { name: "Dr. Fatima Ahmed", role: "Senior Vice President", color: "bg-navy" },
  { name: "Dr. Hassan Sheikh", role: "Vice President", color: "bg-navy" },
  { name: "Dr. Ayesha Siddiqui", role: "General Secretary", color: "bg-navy" },
  { name: "Dr. Usman Tariq", role: "Joint Secretary", color: "bg-teal" },
  { name: "Dr. Nadia Qamar", role: "R&D Secretary", color: "bg-teal" },
  { name: "Dr. Bilal Hussain", role: "Treasurer", color: "bg-teal" },
  { name: "Dr. Sana Rehman", role: "Councilor — Punjab", color: "bg-teal" },
  { name: "Dr. Kamran Shah", role: "Councilor — Sindh", color: "bg-teal" },
  { name: "Dr. Faisal Khan", role: "Councilor — KPK", color: "bg-teal" },
  { name: "Dr. Naseem Baloch", role: "Councilor — Balochistan", color: "bg-teal" },
  { name: "Dr. Rizwan Ali", role: "Overseas Councilor", color: "bg-accent" },
];

const events = [
  { name: "RTCON 2026", date: "Oct 15–17, 2026", location: "Karachi", desc: "Pakistan's premier annual radiation therapy congress featuring international speakers and workshops." },
  { name: "PSORT Annual CPD Workshop", date: "Apr 2026", location: "Lahore", desc: "Hands-on training in advanced treatment planning and quality assurance protocols." },
  { name: "World Radiotherapy Awareness Day", date: "Sep 7, 2026", location: "Nationwide", desc: "National campaign to raise awareness about the critical role of radiotherapy in cancer treatment." },
];

const glanceCards = [
  { title: "Why We Exist", text: "Pakistan has fewer than 500 trained radiation therapists for 230 million people. As the nation's only dedicated RT professional body, PSORT unites specialists to bridge this critical workforce gap." },
  { title: "Why Standards Matter", text: "Treatment outcomes vary dramatically across urban and rural RT centers. Our national clinical guidelines adopted by 60+ facilities are reducing this disparity." },
  { title: "Why Invest in Young Therapists", text: "Pakistan produces fewer than 300 new radiation therapists annually. PSORT's programs train 150+ professionals per year through accredited courses." },
  { title: "Why Awareness Drives Outcomes", text: "Over 60% of cancer patients who need radiotherapy never receive it. PSORT leads national advocacy campaigns to close this life-threatening gap." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

/* ── Component ── */
const Index = () => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      {/* ═══ SECTION 1: HERO ═══ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay grain-texture" />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <span className="text-[30vw] font-display font-bold text-white select-none">PS</span>
        </div>
        <div className="relative z-10 container-narrow section-padding !py-24 lg:!py-36 text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="inline-block text-teal text-xs font-heading font-semibold uppercase tracking-[0.2em] mb-6">
              Pakistan Society of Radiation Therapists
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              One Voice for <br />Radiation Therapy
            </h1>
            <p className="text-lg sm:text-xl opacity-80 max-w-xl mb-10 leading-relaxed">
              Advancing cancer care through education, research, and professional excellence across Pakistan.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/membership" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-accent text-accent-foreground font-heading font-semibold hover:bg-accent/90 transition-colors">
                Become a Member <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border-2 border-white/30 text-white font-heading font-semibold hover:bg-white/10 transition-colors">
                Explore PSORT
              </Link>
            </div>
          </motion.div>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <ArrowDown className="text-white/50" size={24} />
        </motion.div>
      </section>

      {/* ═══ Stats Bar ═══ */}
      <section className="bg-navy text-navy-foreground">
        <div className="container-narrow grid grid-cols-2 lg:grid-cols-4 gap-6 py-10 px-4 sm:px-6 lg:px-8">
          <StatItem num={500} suffix="+" label="Members Nationwide" />
          <StatItem num={60} suffix="+" label="Radiation Therapy Centers" />
          <StatItem num={20} suffix="+" label="Years of Service" />
          <StatItem num={10} suffix="+" label="Annual CME Events" />
        </div>
      </section>

      {/* ═══ SECTION 2: LATEST NEWS ═══ */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-teal text-xs font-heading font-semibold uppercase tracking-[0.15em]">Stay Updated</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">Latest News</h2>
            </div>
            <Link to="/news" className="hidden sm:inline-flex items-center gap-1 text-teal font-heading font-semibold text-sm hover:gap-2 transition-all">
              More News <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((n, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="p-6 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow border border-border group">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-teal font-mono-label">{n.date}</span>
                  <span className="text-muted-foreground font-heading">{n.readTime} read</span>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-teal transition-colors leading-snug">{n.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{n.desc}</p>
                <Link to="/news" className="inline-flex items-center gap-1 text-teal text-sm font-heading font-medium mt-4 hover:gap-2 transition-all">
                  Read More <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: SAVE THE DATE ═══ */}
      <section className="relative bg-navy text-navy-foreground overflow-hidden diagonal-top diagonal-bottom">
        <div className="absolute inset-0 grain-texture opacity-50" />
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-[0.03] flex items-center justify-center">
          <span className="text-[20vw] font-display font-bold select-none">RT</span>
        </div>
        <div className="relative z-10 container-narrow section-padding !py-20 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-heading font-bold uppercase tracking-wider mb-4">
            Save the Date
          </span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">RTCON 2026</h2>
          <p className="text-lg opacity-80 font-heading mb-2">Annual Radiation Therapy Congress of Pakistan</p>
          <p className="text-xl font-heading font-semibold text-teal mb-8">October 15–17, 2026 | Karachi, Pakistan</p>
          <CountdownTimer targetDate="2026-10-15T09:00:00" />
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/rtcon" className="px-7 py-3 rounded-lg bg-accent text-accent-foreground font-heading font-semibold hover:bg-accent/90 transition-colors">
              Register Now
            </Link>
            <Link to="/rtcon" className="px-7 py-3 rounded-lg border-2 border-white/30 text-white font-heading font-semibold hover:bg-white/10 transition-colors">
              Scientific Program
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: ABOUT PSORT ═══ */}
      <section className="section-padding bg-secondary">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              <span className="text-teal text-xs font-heading font-semibold uppercase tracking-[0.15em]">About PSORT</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-5">One Voice for Radiation Therapy in Pakistan</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Pakistan Society of Radiation Therapists (PSORT) is the national professional body representing radiation therapy practitioners across Pakistan. With a growing membership of 500+ therapists from public and private institutions, PSORT drives clinical standards, continuing professional development, research initiatives, and international collaboration.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our mission is to elevate the quality of radiotherapy care for every cancer patient in Pakistan through unified professional advocacy and evidence-based practice.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-teal font-heading font-semibold hover:gap-3 transition-all">
                Learn More <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 flex flex-col gap-3">
              {[
                { label: "Abstract Submission Form", color: "bg-teal text-teal-foreground" },
                { label: "RTCON 2026 Scientific Program", color: "bg-navy text-navy-foreground" },
                { label: "Become a Member", color: "bg-accent text-accent-foreground" },
              ].map((btn) => (
                <Link key={btn.label} to="/rtcon" className={`${btn.color} px-5 py-4 rounded-lg font-heading font-semibold text-center hover:opacity-90 transition-opacity`}>
                  {btn.label}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: PSORT AT A GLANCE ═══ */}
      <section className="section-padding bg-navy text-navy-foreground">
        <div className="container-narrow">
          <SectionHeading badge="At A Glance" title="Why PSORT Matters" description="Understanding the critical need for organized radiation therapy professionals in Pakistan." dark />
          <div className="grid sm:grid-cols-2 gap-6">
            {glanceCards.map((card, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="p-7 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <h3 className="font-heading font-bold text-lg mb-3 text-teal">{card.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/rtcon" className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-accent text-accent-foreground font-heading font-semibold hover:bg-accent/90 transition-colors">
              RTCON 2026 Registration <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: TESTIMONIALS ═══ */}
      <section className="relative section-padding bg-teal text-teal-foreground overflow-hidden">
        <div className="absolute inset-0 grain-texture opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
          <span className="text-[25vw] font-display font-bold select-none">PS</span>
        </div>
        <div className="relative z-10 container-narrow">
          <div className="text-center mb-10">
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] opacity-70">Testimonials</span>
          </div>
          <div className="max-w-4xl mx-auto">
            <AnimatedTestimonial
              testimonial={testimonials[testimonialIdx]}
              key={testimonialIdx}
            />
            <div className="flex items-center justify-center gap-4 mt-10">
              <button onClick={() => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setTestimonialIdx(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === testimonialIdx ? "bg-white scale-125" : "bg-white/30"}`} />
                ))}
              </div>
              <button onClick={() => setTestimonialIdx((i) => (i + 1) % testimonials.length)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: LATEST EVENTS ═══ */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-teal text-xs font-heading font-semibold uppercase tracking-[0.15em]">Upcoming</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">Latest Events</h2>
            </div>
            <Link to="/events" className="hidden sm:inline-flex items-center gap-1 text-teal font-heading font-semibold text-sm hover:gap-2 transition-all">
              Find More Events <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((e, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="p-6 rounded-xl bg-card shadow-card border border-border hover:shadow-card-hover transition-shadow">
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">{e.name}</h3>
                <div className="text-accent font-mono-label text-xl font-bold mb-2">{e.date}</div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{e.desc}</p>
                <span className="inline-block px-2 py-1 rounded bg-secondary text-xs font-heading text-secondary-foreground">{e.location}</span>
                <div className="mt-4">
                  <Link to="/events" className="inline-flex items-center gap-1 text-teal text-sm font-heading font-medium hover:gap-2 transition-all">
                    Find Out More <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 9: INITIATIVES ═══ */}
      <InitiativeBlock
        title="Women in Radiation Therapy"
        text="Leadership development programs, cancer awareness campaigns, research grants for women's cancers, and mentorship programs empowering women professionals in radiation therapy across Pakistan."
        cta="Read More"
        icon={HeartPulse}
        bg="bg-background"
        imageRight
      />
      <InitiativeBlock
        title="Young Therapist Program"
        text="Innovation grants, digital RT training, a national peer network of 200+ young therapists, and career acceleration pathways for the next generation of radiation therapy professionals."
        cta="Apply Now"
        icon={GraduationCap}
        bg="bg-secondary"
      />
      <InitiativeBlock
        title="Residents Corner"
        text="Clinical toolkit, virtual tumor boards, a case repository of 100+ region-specific scenarios, and accredited rotation opportunities for radiation therapy residents."
        cta="View Page"
        icon={BookOpen}
        bg="bg-background"
        imageRight
      />
      <InitiativeBlock
        title="Medical Physics Integration"
        text="Precision dosimetry standards, treatment planning systems, quality assurance protocols, and collaboration frameworks with medical physicists for safer RT delivery."
        cta="Learn More"
        icon={Microscope}
        bg="bg-navy text-navy-foreground"
        dark
      />

      {/* ═══ SECTION 10: PRESIDENT'S MESSAGE ═══ */}
      <section className="section-padding bg-secondary">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full bg-muted border-4 border-teal mb-4 flex items-center justify-center">
                <Users className="text-muted-foreground" size={48} />
              </div>
              <h3 className="font-heading font-bold text-foreground text-lg">Dr. Muhammad Ali</h3>
              <p className="text-sm text-muted-foreground font-heading">President, PSORT</p>
              <div className="w-8 h-8 rounded bg-teal flex items-center justify-center mt-3">
                <span className="text-teal-foreground font-bold text-[10px] font-heading">PS</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
              <span className="text-teal text-xs font-heading font-semibold uppercase tracking-[0.15em]">Leadership</span>
              <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-5">Message from the President</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>It is my privilege to serve as President of the Pakistan Society of Radiation Therapists. Since our founding, PSORT has been the collective voice of radiation therapy professionals across Pakistan, advocating for excellence in cancer care delivery.</p>
                <p>Our current priorities span strengthening CPD frameworks, expanding the Young Therapist initiative, advancing Women in Radiation Therapy programs, and deepening international collaborations with organizations like IAEA, ESTRO, and ASTRO.</p>
                <p>Through programs like the Residents Corner clinical toolkit, the JPSORT research journal, and our annual RTCON congress, we are building an ecosystem where every radiation therapist has the tools to deliver world-class treatment.</p>
                <p>I invite every radiation therapy professional in Pakistan to join us in this mission. Together, we are one voice — for our profession, for our patients, and for a cancer-free future.</p>
              </div>
              <p className="font-heading font-semibold text-foreground mt-6 italic">— Dr. Muhammad Ali, President, PSORT</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 11: EXECUTIVE COUNCIL ═══ */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <SectionHeading badge="Leadership" title="Executive Council" description="The dedicated professionals guiding PSORT's mission across Pakistan." />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {councilMembers.map((m, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="flex flex-col items-center text-center p-5 rounded-xl bg-card shadow-card border border-border">
                <div className="w-20 h-20 rounded-full bg-muted border-2 border-teal/30 mb-3 flex items-center justify-center">
                  <Users className="text-muted-foreground" size={28} />
                </div>
                <h4 className="font-heading font-semibold text-foreground text-sm">{m.name}</h4>
                <span className={`mt-2 px-3 py-1 rounded-full text-[11px] font-heading font-semibold text-white ${m.color}`}>
                  {m.role}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 14: JOURNAL BLOCK ═══ */}
      <section className="section-padding bg-teal/10">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-card">
            <div className="bg-teal text-teal-foreground p-10 flex flex-col justify-center">
              <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <BookOpen size={32} />
              </div>
              <h2 className="font-display text-3xl font-bold mb-2">Journal of PSORT</h2>
              <p className="text-sm opacity-80 font-heading">(JPSORT)</p>
              <p className="mt-4 opacity-80 leading-relaxed">Advancing Radiation Therapy Research in Pakistan through peer-reviewed publications.</p>
            </div>
            <div className="bg-card p-10 flex flex-col justify-center">
              {[
                { title: "Original Research", desc: "Pakistan-specific RT outcomes, survival patterns, and treatment innovations" },
                { title: "Clinical Protocols", desc: "Evidence-based RT guidelines optimized for resource-limited settings" },
                { title: "Case Studies", desc: "Clinical insights from Pakistan's major cancer centers and hospitals" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 mb-5 last:mb-0">
                  <div className="w-2 h-2 rounded-full bg-teal mt-2 shrink-0" />
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-3 mt-6">
                <Link to="/resources" className="px-5 py-2.5 rounded-lg bg-teal text-teal-foreground font-heading font-semibold text-sm hover:bg-teal/90 transition-colors">
                  Submit Research
                </Link>
                <Link to="/resources" className="px-5 py-2.5 rounded-lg border border-border text-foreground font-heading font-semibold text-sm hover:bg-muted transition-colors">
                  Browse Issues
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 15: JOIN CTA ═══ */}
      <section className="relative bg-navy text-navy-foreground overflow-hidden">
        <div className="absolute inset-0 grain-texture opacity-50" />
        <div className="relative z-10 container-narrow section-padding !py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
              Let's come together to ensure every patient in Pakistan gets access to life-saving radiotherapy
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="px-7 py-3.5 rounded-lg border-2 border-white/30 text-white font-heading font-semibold hover:bg-white/10 transition-colors">
                Share Your Story
              </Link>
              <Link to="/membership" className="px-7 py-3.5 rounded-lg bg-accent text-accent-foreground font-heading font-semibold hover:bg-accent/90 transition-colors">
                Join PSORT <ArrowRight size={16} className="inline ml-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 16: SOCIAL BAR ═══ */}
      <section className="bg-teal text-teal-foreground py-4">
        <div className="container-narrow flex items-center justify-center gap-6 px-4">
          <span className="text-sm font-heading font-semibold">Follow Us</span>
          {["Twitter", "Facebook", "LinkedIn", "Instagram", "YouTube"].map((name) => (
            <a key={name} href="#" className="text-sm font-heading opacity-70 hover:opacity-100 transition-opacity">{name}</a>
          ))}
        </div>
      </section>
    </Layout>
  );
};

/* ── Sub-components ── */

function AnimatedTestimonial({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5 }}
      className="grid lg:grid-cols-5 gap-8 items-center">
      <div className="lg:col-span-3">
        <Quote size={40} className="opacity-30 mb-4" />
        <p className="text-xl sm:text-2xl leading-relaxed italic font-display">{testimonial.quote}</p>
        <div className="mt-6">
          <p className="font-heading font-bold text-lg">{testimonial.name}</p>
          <p className="text-sm opacity-70 font-heading">{testimonial.title}</p>
        </div>
      </div>
      <div className="lg:col-span-2 flex justify-center">
        <div className="w-48 h-48 rounded-full bg-white/10 flex items-center justify-center">
          <Users size={64} className="opacity-30" />
        </div>
      </div>
    </motion.div>
  );
}

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

function InitiativeBlock({ title, text, cta, icon: Icon, bg, dark, imageRight }: {
  title: string; text: string; cta: string; icon: React.ElementType; bg: string; dark?: boolean; imageRight?: boolean;
}) {
  const textColor = dark ? "text-white" : "text-foreground";
  const mutedColor = dark ? "text-white/70" : "text-muted-foreground";
  const ctaColor = dark ? "text-teal" : "text-teal";

  const textBlock = (
    <motion.div initial={{ opacity: 0, x: imageRight ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
      <h2 className={`font-display text-3xl font-bold ${textColor} mb-4`}>{title}</h2>
      <p className={`${mutedColor} leading-relaxed mb-6`}>{text}</p>
      <Link to="/resources" className={`inline-flex items-center gap-2 ${ctaColor} font-heading font-semibold hover:gap-3 transition-all`}>
        {cta} <ArrowRight size={16} />
      </Link>
    </motion.div>
  );

  const imageBlock = (
    <motion.div initial={{ opacity: 0, x: imageRight ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      className="flex items-center justify-center">
      <div className={`w-full max-w-sm aspect-[4/3] rounded-2xl ${dark ? "bg-white/5" : "bg-muted"} flex items-center justify-center`}>
        <Icon size={64} className={dark ? "text-teal opacity-40" : "text-teal/30"} />
      </div>
    </motion.div>
  );

  return (
    <section className={`section-padding ${bg}`}>
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {imageRight ? <>{textBlock}{imageBlock}</> : <>{imageBlock}{textBlock}</>}
        </div>
      </div>
    </section>
  );
}

export default Index;
