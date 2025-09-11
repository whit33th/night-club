"use client";

import NavigationList from "./_components/NavigationList";
import SidebarFooter from "./_components/SidebarFooter";
import { useSidebar } from "./_hooks/useSidebar";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const { closeSidebar } = useSidebar({ open, setOpen });

  return (
    <aside
      className={`fixed inset-0 top-14 z-50 w-full border-b border-[color-mix(in_srgb,var(--primary)_20%,transparent)] bg-black/85 backdrop-blur-2xl transition-transform will-change-transform md:hidden ${
        open ? "translate-y-0" : "hidden -translate-y-full"
      }`}
      role="dialog"
      aria-modal
      aria-labelledby="sidebar-title"
      aria-describedby="sidebar-description"
      aria-hidden={!open}
    >
      <div className="relative h-full w-full">
        {/* Ambient glow effect */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_at_bottom,rgba(185,53,16,0.22),transparent_60%)] blur-2xl" />

        <NavigationList onItemClick={closeSidebar} />
        <SidebarFooter onClose={closeSidebar} />
      </div>
    </aside>
  );
};

export default Sidebar;
