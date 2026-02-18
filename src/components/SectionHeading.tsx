import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  center?: boolean;
}

const SectionHeading = ({ badge, title, description, children, center = true }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    className={`mb-12 ${center ? "text-center" : ""}`}
  >
    {badge && (
      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
        {badge}
      </span>
    )}
    <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">{title}</h2>
    {description && <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{description}</p>}
    {children}
  </motion.div>
);

export default SectionHeading;
