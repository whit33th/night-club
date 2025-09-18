"use client";

import { unstable_Activity as Activity } from "react";
import NavigationList from "./_components/NavigationList";
import SidebarFooter from "./_components/SidebarFooter";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  navLinks: { href: string; label: string }[];
}

const Sidebar = ({ open, setOpen, navLinks }: SidebarProps) => {
  return (
    <Activity mode={open ? "visible" : "hidden"}>
      <aside
        className={`fixed inset-0 top-14 z-50 h-[calc(100%-3.5rem)] w-full border-b border-[color-mix(in_srgb,var(--primary)_20%,transparent)] md:hidden`}
        role="dialog"
        aria-modal
        aria-labelledby="sidebar-title"
        aria-describedby="sidebar-description"
        aria-hidden={!open}
      >
        <NavigationList
          onItemClick={() => setOpen(false)}
          navLinks={navLinks}
        />
        <SidebarFooter onClose={() => setOpen(false)} />
      </aside>
    </Activity>
  );
};

export default Sidebar;
