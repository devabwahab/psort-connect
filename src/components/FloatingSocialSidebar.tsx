import { Facebook, Linkedin, Youtube, MessageCircle } from "lucide-react";

const socials = [
  { Icon: Youtube, href: "https://youtube.com/@psort-7k?si=7mo3JktknGDKmf90", label: "YouTube" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/pakistan-society-of-radiation-therapists-psort/", label: "LinkedIn" },
  { Icon: MessageCircle, href: "https://chat.whatsapp.com/LGvZtLQ48QNHqUmicq7581?mode=gi_t", label: "WhatsApp" },
  { Icon: Facebook, href: "#", label: "Facebook" },
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
