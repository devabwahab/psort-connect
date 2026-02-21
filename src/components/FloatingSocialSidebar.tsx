import { Facebook, Linkedin, Youtube, MessageCircle } from "lucide-react";

const socials = [
  {
    Icon: Facebook,
    href: "https://www.facebook.com/",
    label: "Facebook",
    color: "text-blue-500 hover:text-blue-600",
  },
  {
    Icon: MessageCircle,
    href: "https://chat.whatsapp.com/LGvZtLQ48QNHqUmicq7581?mode=gi_t",
    label: "WhatsApp",
    color: "text-green-500 hover:text-green-600",
  },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/company/pakistan-society-of-radiation-therapists-psort/",
    label: "LinkedIn",
    color: "text-blue-600 hover:text-blue-700",
  },
  {
    Icon: Youtube,
    href: "https://youtube.com/@psort-7k?si=7mo3JktknGDKmf90",
    label: "YouTube",
    color: "text-red-600 hover:text-red-700",
  },
  
];

const FloatingSocialSidebar = () => (
  <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-0.5">
    {socials.map(({ Icon, href, label, color }) => (
      <a
        key={label}
        href={href}
        aria-label={label}
        className={`w-10 h-10 text-colors ${color} flex items-center justify-center transition-colors ${color}`}
      >
        <Icon size={16} />
      </a>
    ))}
  </div>
);

export default FloatingSocialSidebar;