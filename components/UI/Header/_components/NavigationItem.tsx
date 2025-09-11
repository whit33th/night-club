import Link from "next/link";

interface NavigationItemProps {
  href: string;
  label: string;
  onClick: () => void;
}

const NavigationItem = ({ href, label, onClick }: NavigationItemProps) => (
  <li>
    <Link
      href={href}
      onClick={onClick}
      className="flex border border-transparent px-4 py-4 text-3xl font-semibold text-white/90 transition hover:border-[color-mix(in_srgb,var(--primary)_25%,transparent)] hover:bg-[color-mix(in_srgb,var(--primary)_10%,transparent)]"
    >
      {label}
    </Link>
  </li>
);

export default NavigationItem;
