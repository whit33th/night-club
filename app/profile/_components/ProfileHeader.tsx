"use client";

import { MessageSquare, Settings, Ticket } from "lucide-react";
import Image from "next/image";
import { TabKey } from "../page";

type Props = {
  active: TabKey;
  onChange: (tab: Props["active"]) => void;
};

export default function ProfileHeader({ active, onChange }: Props) {
  const tabs = [
    {
      key: "liked",
      label: "Liked",
      icon: <Ticket className="h-4 w-4" />,
    },
    {
      key: "messages",
      label: "Messages",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ] as const;

  return (
    <section className="sticky top-14 z-10 mb-6 bg-black/10 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-4 p-4">
        <div className="flex w-full items-center justify-between">
          <Image
            src="/imgs/residents/1.png"
            alt="User avatar"
            width={100}
            height={100}
            className="aspect-square h-full w-auto rounded-lg object-cover"
          />
          <div className="mr-auto flex-1 p-4">
            <h1 className="text-2xl font-extrabold tracking-tight">
              Alex Midnight
            </h1>
            <p className="text-sm text-white/60">Member since 2023</p>
          </div>
        </div>
        <nav className="flex w-full items-center gap-2 overflow-x-auto sm:w-auto">
          {tabs.map((tab) => (
            <TabButton
              key={tab.key}
              active={active === tab.key}
              onClick={() => onChange(tab.key)}
              label={tab.label}
              icon={tab.icon}
            />
          ))}
        </nav>
      </div>
    </section>
  );
}

type TabButtonProps = {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
};

function TabButton({ active, onClick, label, icon }: TabButtonProps) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
        active
          ? "border-primary/40 bg-primary/15 text-primary"
          : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
