import { Facebook, Linkedin, Instagram, Twitter, Youtube } from "lucide-react";

const socials = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

const FloatingSocialSidebar = () => (
  <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-0.5">
    {socials.map(({ Icon, href, label }) => (
      <a
        key={label}
        href={href}
        aria-label={label}
        className="w-10 h-10 bg-navy text-navy-foreground flex items-center justify-center hover:bg-teal transition-colors"
      >
        <Icon size={16} />
      </a>
    ))}
  </div>
);

export default FloatingSocialSidebar;
