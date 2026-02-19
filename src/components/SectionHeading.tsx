import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  center?: boolean;
  dark?: boolean;
}

const SectionHeading = ({ badge, title, description, children, center = true, dark = false }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    className={`mb-12 ${center ? "text-center" : ""}`}
  >
    {badge && (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-heading font-semibold uppercase tracking-wider mb-3 ${dark ? "bg-teal/20 text-teal" : "bg-teal/10 text-teal"}`}>
        {badge}
      </span>
    )}
    <h2 className={`font-display text-3xl sm:text-4xl font-bold ${dark ? "text-white" : "text-foreground"}`}>{title}</h2>
    {description && <p className={`mt-3 max-w-2xl mx-auto ${dark ? "text-white/70" : "text-muted-foreground"}`}>{description}</p>}
    {children}
  </motion.div>
);

export default SectionHeading;
