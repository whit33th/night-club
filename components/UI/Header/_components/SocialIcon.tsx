import Link from "next/link";

interface SocialIconProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const SocialIcon = ({ href, icon: Icon, label }: SocialIconProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="inline-flex items-center justify-center rounded-full border border-white/15 p-2 text-white/80 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
  >
    <Icon className="h-4 w-4" />
  </Link>
);

export default SocialIcon;
