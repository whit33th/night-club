import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface UseSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useSidebar = ({ open, setOpen }: UseSidebarProps) => {
  const location = usePathname();

  // Handle escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen, open]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location, setOpen]);

  const closeSidebar = () => setOpen(false);

  return { closeSidebar };
};
