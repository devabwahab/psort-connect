import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Facebook, Linkedin, Instagram, Twitter, Youtube, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const megaMenus: Record<string, { label: string; to: string }[]> = {
  "About PSORT": [
    { label: "Our Story & Mission", to: "/about" },
    { label: "Executive Council", to: "/committee" },
    { label: "Patrons & Advisors", to: "/about#patrons" },
    { label: "Annual Reports", to: "/about#reports" },
    { label: "Constitution & Bylaws", to: "/about#constitution" },
  ],
  "Membership": [
    { label: "Why Join PSORT?", to: "/membership" },
    { label: "Membership Categories", to: "/membership#categories" },
    { label: "Become a Member", to: "/membership#apply" },
    { label: "Therapist Directory", to: "/membership#directory" },
  ],
  "RTCON": [
    { label: "RTCON 2026", to: "/rtcon" },
    { label: "Previous RTCONs", to: "/rtcon#past" },
    { label: "Sponsorship", to: "/rtcon#sponsors" },
  ],
  "News & Events": [
    { label: "Latest News", to: "/news" },
    { label: "Upcoming Events", to: "/events" },
    { label: "Gallery", to: "/gallery" },
  ],
};

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About PSORT", to: "/about" },
  { label: "Membership", to: "/membership" },
  { label: "RTCON", to: "/rtcon" },
  { label: "News & Events", to: "/events" },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, profile } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  return (
    <>
      {/* Utility Bar */}
      <div className="bg-navy text-navy-foreground">
        <div className="container-narrow flex items-center justify-between px-4 sm:px-6 lg:px-8 h-9 text-xs">
          <div className="flex items-center gap-3">
            {[Twitter, Facebook, Linkedin, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                <Icon size={13} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link to="/dashboard" className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity font-heading">
                <User size={14} />
                {profile?.full_name || "Dashboard"}
              </Link>
            ) : (
              <>
                <Link to="/login" className="opacity-70 hover:opacity-100 transition-opacity font-heading">Login</Link>
                <Link to="/membership" className="px-3 py-1 rounded bg-accent text-accent-foreground font-heading font-semibold hover:bg-accent/90 transition-colors">
                  Become a Member
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`sticky top-0 z-50 bg-card/98 backdrop-blur-md transition-shadow ${scrolled ? "shadow-md" : ""}`}>
        <div className="container-narrow flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-teal flex items-center justify-center">
              <span className="text-teal-foreground font-bold text-sm font-heading">PS</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-foreground text-lg leading-tight block">PSORT</span>
              <span className="text-[9px] text-muted-foreground leading-none font-heading tracking-wide uppercase">One Voice for Radiation Therapy</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" ref={dropdownRef}>
            {navLinks.map((link) => {
              const hasDropdown = megaMenus[link.label];
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.to}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-heading font-medium transition-colors ${
                      location.pathname === link.to
                        ? "text-teal bg-teal/10"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                    {hasDropdown && <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.label ? "rotate-180" : ""}`} />}
                  </Link>

                  <AnimatePresence>
                    {hasDropdown && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-0.5 w-56 bg-card rounded-lg shadow-lg border border-border p-2 z-50"
                      >
                        {hasDropdown.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            className="block px-3 py-2 text-sm font-heading text-foreground/80 hover:text-teal hover:bg-teal/5 rounded-md transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-border bg-card"
            >
              <nav className="flex flex-col p-4 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-md text-sm font-heading font-medium transition-colors ${
                      location.pathname === link.to
                        ? "text-teal bg-teal/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/membership"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 px-4 py-3 rounded-lg bg-accent text-accent-foreground text-sm font-heading font-semibold text-center"
                >
                  Become a Member
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
