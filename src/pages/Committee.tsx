import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const committee = [
  { name: "Dr. Ahmed Khan", role: "President", initials: "AK" },
  { name: "Dr. Fatima Noor", role: "Vice President", initials: "FN" },
  { name: "Mr. Bilal Hussain", role: "General Secretary", initials: "BH" },
  { name: "Ms. Ayesha Malik", role: "Treasurer", initials: "AM" },
  { name: "Dr. Usman Tariq", role: "Education Chair", initials: "UT" },
  { name: "Ms. Sana Rauf", role: "Membership Secretary", initials: "SR" },
  { name: "Dr. Zainab Ali", role: "Research & Publications", initials: "ZA" },
  { name: "Mr. Hassan Raza", role: "Events Coordinator", initials: "HR" },
  { name: "Dr. Nadia Farooq", role: "International Liaison", initials: "NF" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } }),
};

const Committee = () => (
  <Layout>
    <section className="hero-gradient text-primary-foreground section-padding !py-20">
      <div className="container-narrow text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Executive Committee</h1>
          <p className="text-lg opacity-85 max-w-2xl mx-auto">Meet the dedicated professionals leading PSORT's mission to advance radiation therapy in Pakistan.</p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container-narrow">
        <SectionHeading badge="Leadership" title="Our Team" description="The PSORT Executive Committee is elected by members and serves a two-year term." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {committee.map((m, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-6 rounded-xl bg-card shadow-card border border-border text-center hover:shadow-card-hover transition-shadow">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                <span className="text-primary font-bold text-2xl">{m.initials}</span>
              </div>
              <h4 className="font-sans font-semibold text-foreground text-lg">{m.name}</h4>
              <p className="text-sm text-accent font-medium mt-1">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Committee;
