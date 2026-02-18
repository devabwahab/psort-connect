import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container-narrow section-padding !py-12 lg:!py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">PS</span>
            </div>
            <span className="font-display font-bold text-lg">PSORT</span>
          </div>
          <p className="text-sm opacity-70 mb-5 leading-relaxed">
            Pakistan Society of Radiation Technologists — advancing excellence in radiation technology, medical imaging, and patient care.
          </p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4 opacity-80">Quick Links</h4>
          <ul className="space-y-2.5 text-sm opacity-70">
            {["About Us", "Membership", "Education & Events", "Resources", "Gallery", "Contact"].map((label) => (
              <li key={label}>
                <Link to={`/${label.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} className="hover:opacity-100 transition-opacity">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4 opacity-80">Contact</h4>
          <ul className="space-y-3 text-sm opacity-70">
            <li className="flex items-start gap-2"><Mail size={15} className="mt-0.5 shrink-0" /> info@psort.org.pk</li>
            <li className="flex items-start gap-2"><Phone size={15} className="mt-0.5 shrink-0" /> +92 300 1234567</li>
            <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0" /> Islamabad, Pakistan</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4 opacity-80">Newsletter</h4>
          <p className="text-sm opacity-70 mb-4">Stay updated with the latest in radiation technology.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-background/10 border border-background/20 text-sm placeholder:opacity-50 focus:outline-none focus:border-primary"
            />
            <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs opacity-50">
        <p>&copy; {new Date().getFullYear()} Pakistan Society of Radiation Technologists. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
