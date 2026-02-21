import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube, ArrowRight, MessageCircle } from "lucide-react";

const Footer = () => (
  <footer className="bg-navy text-navy-foreground">
    <div className="container-narrow section-padding !py-12 lg:!py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* PSORT Info */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <img src="/psort_logo.png" alt="PSORT Logo" className="w-10 h-10 rounded-lg object-contain" />
            <span className="font-display font-bold text-lg">PSORT</span>
          </div>
          <p className="text-sm opacity-60 mb-4 leading-relaxed">
            One Voice for Radiation Therapy in Pakistan. Advancing cancer care through education, research, and professional excellence.
          </p>
          <ul className="space-y-2 text-sm opacity-60">
            <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" /> PSORT Head Office, Karachi, Pakistan</li>
            <li className="flex items-start gap-2"><Mail size={14} className="mt-0.5 shrink-0" /> psortoffical@gmail.com</li>
            <li className="flex items-start gap-2"><Phone size={14} className="mt-0.5 shrink-0" /> +92 316 1624334</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-5 opacity-80">Quick Links</h4>
          <ul className="space-y-2.5 text-sm opacity-60">
            {[
              { label: "Home", to: "/" },
              { label: "About PSORT", to: "/about" },
              { label: "RTCON 2026", to: "/rtcon" },
              { label: "R&D Wing", to: "/resources" },
              { label: "Membership", to: "/membership" },
              { label: "News & Events", to: "/events" },
              { label: "Contact", to: "/contact" },
            ].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:opacity-100 hover:text-teal transition-all font-heading">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Become a Member */}
        <div>
          <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-5 opacity-80">Become a Member</h4>
          <p className="text-sm opacity-60 mb-6 leading-relaxed">
            Join Pakistan's leading professional body for radiation therapists. Grow your career, expand your network, and make an impact in cancer care.
          </p>
          <Link
            to="/membership"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-heading font-semibold hover:bg-accent/90 transition-colors"
          >
            Join Now <ArrowRight size={15} />
          </Link>
          <div className="flex gap-3 mt-6">
            {[
              { Icon: Youtube, href: "https://youtube.com/@psort-7k?si=7mo3JktknGDKmf90", label: "YouTube" },
              { Icon: Linkedin, href: "https://www.linkedin.com/company/pakistan-society-of-radiation-therapists-psort/", label: "LinkedIn" },
              { Icon: MessageCircle, href: "https://chat.whatsapp.com/LGvZtLQ48QNHqUmicq7581?mode=gi_t", label: "WhatsApp" },
              { Icon: Facebook, href: "#", label: "Facebook" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-8 h-8 rounded-full bg-white/10 hover:bg-teal flex items-center justify-center transition-colors">
                <s.Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs opacity-40 font-heading">
        <p>Pakistan Society of Radiation Therapists &copy; {new Date().getFullYear()} www.psort.com.pk</p>
        <div className="flex gap-4">
          <a href="#" className="hover:opacity-100">Privacy Policy</a>
          <a href="#" className="hover:opacity-100">Terms of Use</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
