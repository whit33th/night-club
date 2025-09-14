import NavigationItem from "./NavigationItem";

interface NavigationListProps {
  onItemClick: () => void;
  navLinks: { href: string; label: string }[];
}

const NavigationList = ({ onItemClick, navLinks }: NavigationListProps) => (
  <ul className="flex flex-col">
    {navLinks.map((item) => (
      <NavigationItem
        key={item.href}
        href={item.href}
        label={item.label}
        onClick={onItemClick}
      />
    ))}
  </ul>
);

export default NavigationList;
