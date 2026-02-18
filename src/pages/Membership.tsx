import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const benefits = [
  "Access to exclusive workshops, conferences, and CPD events",
  "Professional networking with peers across Pakistan",
  "Subscription to PSORT journal and publications",
  "Discounted rates on training programs",
  "Career development resources and job listings",
  "Voting rights and participation in PSORT governance",
  "Recognition and awards for professional excellence",
  "Access to online resources and digital library",
];

const categories = [
  { name: "Student Member", price: "PKR 1,000/year", desc: "For enrolled students of radiation technology programs.", features: ["Event access", "Digital resources", "Student networking"] },
  { name: "Associate Member", price: "PKR 3,000/year", desc: "For early-career professionals with less than 3 years of experience.", features: ["All student benefits", "CPD workshops", "Journal access"], highlight: false },
  { name: "Full Member", price: "PKR 5,000/year", desc: "For qualified radiation technologists with 3+ years of experience.", features: ["All associate benefits", "Voting rights", "Leadership opportunities"], highlight: true },
  { name: "Fellow", price: "PKR 10,000/year", desc: "For senior professionals with significant contributions to the field.", features: ["All full benefits", "Advisory board access", "Mentorship program"] },
];

const faqs = [
  { q: "Who can join PSORT?", a: "Any radiation technologist, radiographer, radiation therapist, or medical imaging professional practicing or studying in Pakistan is eligible to join." },
  { q: "How do I apply?", a: "Fill out the membership application form on this page and submit along with your credentials. Our team will review and respond within 5-7 business days." },
  { q: "Can international professionals join?", a: "Yes, we welcome international members. Please contact us for details on international membership." },
  { q: "What payment methods are accepted?", a: "We accept bank transfer, JazzCash, EasyPaisa, and credit/debit card payments." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Membership = () => (
  <Layout>
    <section className="hero-gradient text-primary-foreground section-padding !py-20">
      <div className="container-narrow text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Membership</h1>
          <p className="text-lg opacity-85 max-w-2xl mx-auto">Join a community of professionals dedicated to advancing radiation technology in Pakistan.</p>
        </motion.div>
      </div>
    </section>

    {/* Benefits */}
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <SectionHeading badge="Why Join" title="Member Benefits" />
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {benefits.map((b, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex items-start gap-3 p-4 rounded-lg bg-card shadow-card border border-border">
              <CheckCircle className="text-accent shrink-0 mt-0.5" size={18} />
              <span className="text-sm text-foreground">{b}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Categories */}
    <section className="section-padding bg-muted">
      <div className="container-narrow">
        <SectionHeading badge="Plans" title="Membership Categories" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`p-6 rounded-xl border flex flex-col ${c.highlight ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]" : "bg-card text-foreground border-border shadow-card"}`}>
              <h3 className="font-sans font-bold text-lg">{c.name}</h3>
              <div className="text-2xl font-bold mt-2">{c.price}</div>
              <p className={`text-sm mt-2 mb-4 ${c.highlight ? "opacity-85" : "text-muted-foreground"}`}>{c.desc}</p>
              <ul className="space-y-2 mt-auto mb-6">
                {c.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={14} className={c.highlight ? "opacity-85" : "text-accent"} />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${c.highlight ? "bg-primary-foreground text-foreground hover:bg-primary-foreground/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Application Form */}
    <section className="section-padding bg-background">
      <div className="container-narrow max-w-2xl">
        <SectionHeading badge="Apply" title="Membership Application" />
        <motion.form initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} onSubmit={(e) => e.preventDefault()} className="space-y-5 p-8 rounded-xl bg-card shadow-card border border-border">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
              <input className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your full name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
              <input className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+92 300 1234567" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Student Member</option>
                <option>Associate Member</option>
                <option>Full Member</option>
                <option>Fellow</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Qualifications</label>
            <textarea rows={3} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="List your qualifications and experience" />
          </div>
          <button type="submit" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            Submit Application <ArrowRight size={16} />
          </button>
        </motion.form>
      </div>
    </section>

    {/* FAQs */}
    <section className="section-padding bg-muted">
      <div className="container-narrow max-w-3xl">
        <SectionHeading badge="FAQs" title="Frequently Asked Questions" />
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-5 rounded-xl bg-card shadow-card border border-border">
              <h4 className="font-sans font-semibold text-foreground mb-2">{f.q}</h4>
              <p className="text-sm text-muted-foreground">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Membership;
