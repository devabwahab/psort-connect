import { motion } from "framer-motion";
import { Target, Eye, Award, BookOpen, Users, Lightbulb, HeartPulse, Globe } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const objectives = [
  { icon: Award, text: "Promote excellence in radiation technology practice and patient care" },
  { icon: BookOpen, text: "Support continuous education, training, and professional development" },
  { icon: Lightbulb, text: "Encourage research, innovation, and evidence-based practice" },
  { icon: Users, text: "Facilitate collaboration and networking among professionals" },
  { icon: HeartPulse, text: "Improve healthcare standards and radiation safety" },
  { icon: Globe, text: "Represent the profession at national and international forums" },
];

const leaders = [
  { name: "Dr. Ahmed Khan", role: "President", initials: "AK" },
  { name: "Dr. Fatima Noor", role: "Vice President", initials: "FN" },
  { name: "Mr. Bilal Hussain", role: "General Secretary", initials: "BH" },
  { name: "Ms. Ayesha Malik", role: "Treasurer", initials: "AM" },
  { name: "Dr. Usman Tariq", role: "Education Chair", initials: "UT" },
  { name: "Ms. Sana Rauf", role: "Membership Secretary", initials: "SR" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const About = () => (
  <Layout>
    {/* Header */}
    <section className="hero-gradient text-primary-foreground section-padding !py-20">
      <div className="container-narrow text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">About PSORT</h1>
          <p className="text-lg opacity-85 max-w-2xl mx-auto">
            Learn about our mission, vision, and the team dedicated to advancing radiation technology in Pakistan.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Overview */}
    <section className="section-padding bg-background">
      <div className="container-narrow max-w-4xl">
        <SectionHeading badge="Who We Are" title="Organization Overview" />
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="prose max-w-none text-muted-foreground space-y-4 text-center">
          <p className="text-lg leading-relaxed">
            The Pakistan Society of Radiation Technologists (PSORT) is the premier national professional organization representing radiation technologists, radiographers, radiation therapists, and medical imaging professionals across Pakistan.
          </p>
          <p className="leading-relaxed">
            Established to unite and elevate the profession, PSORT serves as a collective voice advocating for professional recognition, quality education, and improved healthcare standards in the field of radiation technology and medical imaging.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="section-padding bg-muted">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { icon: Eye, title: "Our Vision", text: "To be the leading professional society that sets the benchmark for radiation technology practice, education, and patient care in Pakistan and the region." },
            { icon: Target, title: "Our Mission", text: "To advance the profession of radiation technology through continuous education, research, collaboration, and advocacy, ensuring the highest standards of patient care and professional excellence." },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="p-8 rounded-xl bg-card shadow-card border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <item.icon className="text-primary" size={28} />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Objectives */}
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <SectionHeading badge="Our Goals" title="Key Objectives" description="The core objectives that drive everything we do at PSORT." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((obj, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex gap-4 p-5 rounded-xl bg-card shadow-card border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <obj.icon className="text-primary" size={20} />
              </div>
              <p className="text-sm text-foreground leading-relaxed">{obj.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Leadership */}
    <section className="section-padding bg-muted">
      <div className="container-narrow">
        <SectionHeading badge="Leadership" title="Executive Committee" description="Meet the dedicated professionals leading PSORT." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaders.map((l, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-6 rounded-xl bg-card shadow-card border border-border text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">{l.initials}</span>
              </div>
              <h4 className="font-sans font-semibold text-foreground">{l.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">{l.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
